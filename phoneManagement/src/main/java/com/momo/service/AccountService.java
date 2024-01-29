package com.momo.service;

import com.momo.domain.user.UserDetailsImpl;
import com.momo.mapper.AccountMapper;
import com.momo.mapper.EmployeeMapper;
import com.momo.vo.CommonVO;
import com.momo.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AccountService extends CommonService<UserInfoVO,UserInfoVO> implements UserDetailsService{
	private final PasswordEncoder passwordEncoder;
	private final AccountMapper accountMapper;

	private final EmployeeMapper employeeMapper;

	@Override
	public int update(UserInfoVO map){
		return accountMapper.update(map);
	}

	@Override
	public int delete(UserInfoVO map) {
		return accountMapper.delete(map);
	}

	@Override
	public List<UserInfoVO> select(UserInfoVO userInfoVO) {
		return accountMapper.select(getSelectQueryString(userInfoVO));
	}

	@Override
	public UserInfoVO selectOne(UserInfoVO map) {
		return select(map).get(0);
	}

	@Override
	public List<UserInfoVO> search(CommonVO key) {
		return accountMapper.search(key);
	}

	@Override
	public List<UserInfoVO> selectAll() {
		return accountMapper.selectAll();
	}

	public int updatePassword(UserInfoVO userInfoVO){
		userInfoVO.setUpdatePwd(passwordEncoder.encode(userInfoVO.getUpdatePwd()));
		return accountMapper.updatePassword(userInfoVO);
	}

	public int insert(UserInfoVO userInfoVO){
		return accountMapper.insert(userInfoVO);
	}

	public int updateRole(UserInfoVO userInfoVO){
		return accountMapper.updateRole(userInfoVO);
	}

	public void replaceAuthority(String role){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		List<GrantedAuthority> updateAuthorities = new ArrayList<>();

		updateAuthorities.add(new SimpleGrantedAuthority(role));

		Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(),auth.getCredentials(),updateAuthorities);

		SecurityContextHolder.getContext().setAuthentication(newAuth);
	}


	public UserInfoVO getAccountById(String id){
		List<UserInfoVO> adminVO = select(UserInfoVO.builder().id(id).build());
		System.out.println(adminVO);
		if(adminVO != null && !adminVO.isEmpty()){
			return adminVO.get(0);
		}
		return null;
	}

	public UserInfoVO getAccountByEmail(String email){
		List<UserInfoVO> adminVO = select(UserInfoVO.builder().email(email).build());
		if(adminVO != null && !adminVO.isEmpty()){
			return adminVO.get(0);
		}
		return null;
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserInfoVO userInfoVO = getAccountById(username);
		if(userInfoVO == null){
			throw new UsernameNotFoundException(String.format("User {%s} Not Founded!",username));
		}

		String id = userInfoVO.getId();
		String pwd = userInfoVO.getPwd();
		String role = userInfoVO.getRole();

		UserDetailsImpl userDetails = new UserDetailsImpl(id, pwd, role);

		if(role.equals("NONE")){
			return userDetails;
		}

		if(!role.equals("ADMIN") && !role.equals("CUSTOMER") ){
			UserInfoVO emp = employeeMapper.selectById(id);
			if(emp.isApprovalSt()){
				userDetails.add(new SimpleGrantedAuthority("APPROVE"));
			}
		}

		return userDetails;
	}
}
