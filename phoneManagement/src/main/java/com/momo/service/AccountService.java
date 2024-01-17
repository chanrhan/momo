package com.momo.service;

import com.momo.mapper.AccountMapper;
import com.momo.mapper.DefaultCRUDMapper;
import com.momo.vo.ShopVO;
import com.momo.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

import java.sql.Struct;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService implements DefaultCRUDService<UserInfoVO,UserInfoVO>, UserDetailsService{
	private final PasswordEncoder passwordEncoder;
	private final AccountMapper accountMapper;

	public int update(UserInfoVO userInfoVO){
		return accountMapper.update(userInfoVO);
	}

	@Override
	public int delete(UserInfoVO key) {
		return accountMapper.delete(key);
	}

	@Override
	public List<UserInfoVO> select(UserInfoVO key) {
		return accountMapper.select(key);
	}

	@Override
	public UserInfoVO selectOne(UserInfoVO key) {
		return select(key).get(0);
	}

	public List<UserInfoVO> search(UserInfoVO key) {
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
		userInfoVO.setPwd(passwordEncoder.encode(userInfoVO.getPwd()));
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

	public void loginWithSignup(String username){
		this.loadUserByUsername(username);
	}

	public UserInfoVO getAccountById(String id){
		List<UserInfoVO> adminVO = select(UserInfoVO.builder().id(id).build());
//		System.out.println(adminVO);
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
		UserInfoVO user = getAccountById(username);
		if(user == null){
			throw new UsernameNotFoundException(String.format("User {%s} Not Founded!",username));
		}

		return user.getUserDetailsImpl();
	}
}
