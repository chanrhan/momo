package com.momo.service;

import com.momo.domain.user.UserDetailsImpl;
import com.momo.mapper.AccountMapper;
import com.momo.mapper.EmployeeMapper;
import com.momo.vo.CommonVO;
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
public class AccountService extends CommonService implements UserDetailsService{
	private final PasswordEncoder passwordEncoder;
	private final AccountMapper accountMapper;

	private final EmployeeMapper employeeMapper;

	@Override
	public int update(Map<String,Object> map){
		return accountMapper.update(map);
	}

	@Override
	public int delete(Map<String,Object> map) {
		return accountMapper.delete(map);
	}

	@Override
	public List<Map<String,Object>> select(Map<String,Object> map) {
		return accountMapper.select(getSelectQueryString(map));
	}

	@Override
	public Map<String,Object> selectOne(Map<String,Object> map) {
		return select(map).get(0);
	}

	@Override
	public List<Map<String,Object>> search(CommonVO key) {
		return accountMapper.search(key);
	}

	@Override
	public List<Map<String,Object>> selectAll() {
		return accountMapper.selectAll();
	}

	public int updatePassword(Map<String,Object> map){
		map.put("update_pwd", passwordEncoder.encode(map.get("update_pwd").toString()));
		return accountMapper.updatePassword(map);
	}

	public int insert(Map<String,Object> map){
		map.put("pwd",passwordEncoder.encode(map.get("pwd").toString()));
		return accountMapper.insert(map);
	}

	public int updateRole(Map<String,Object> map){
		return accountMapper.updateRole(map);
	}

	public void replaceAuthority(String role){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		List<GrantedAuthority> updateAuthorities = new ArrayList<>();

		updateAuthorities.add(new SimpleGrantedAuthority(role));

		Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(),auth.getCredentials(),updateAuthorities);

		SecurityContextHolder.getContext().setAuthentication(newAuth);
	}


	public Map<String,Object> getAccountById(String id){
		Map<String,Object> map = new HashMap<>();
		map.put("id",id);
		List<Map<String,Object>> adminVO = select(map);
		System.out.println(adminVO);
		if(adminVO != null && !adminVO.isEmpty()){
			return adminVO.get(0);
		}
		return null;
	}

	public Map<String,Object> getAccountByEmail(String email){
		Map<String,Object> map = new HashMap<>();
		map.put("email",email);
		List<Map<String,Object>> adminVO = select(map);
		if(adminVO != null && !adminVO.isEmpty()){
			return adminVO.get(0);
		}
		return null;
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Map<String,Object> map = getAccountById(username);
		if(map == null){
			throw new UsernameNotFoundException(String.format("User {%s} Not Founded!",username));
		}

		String id = map.get("id").toString();
		String pwd = map.get("pwd").toString();
		String role = map.get("role").toString();

		UserDetailsImpl userDetails = new UserDetailsImpl(id, pwd, role);

		if(role.equals("NONE")){
			return userDetails;
		}

		if(!role.equals("ADMIN") && !role.equals("CUSTOMER") ){
			Map<String,Object> emp = employeeMapper.selectById(id);
			if(emp.get("approve_st").equals("1")){
				userDetails.add(new SimpleGrantedAuthority("APPROVE"));
			}
		}

		return userDetails;
	}
}
