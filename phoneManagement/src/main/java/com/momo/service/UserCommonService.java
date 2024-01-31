package com.momo.service;

import com.momo.domain.user.UserDetailsImpl;
import com.momo.mapper.UserCommonMapper;
import com.momo.vo.SearchVO;
import com.momo.vo.UserCommonVO;
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
public class UserService extends CommonService implements UserDetailsService{
	private final PasswordEncoder  passwordEncoder;
	private final UserCommonMapper userCommonMapper;

	private final EmployeeMapper employeeMapper;

	// User Account
	public int insertUser(UserCommonVO vo){
		vo.setPwd(passwordEncoder.encode(vo.getPwd()));
		return userCommonMapper.insertUser(vo);
	}
	public int updateUser(UserCommonVO vo){
		return userCommonMapper.updateUser(getUpdateQueryString(vo));
	}

	public int updatePassword(UserCommonVO vo){
		vo.setUpdatePwd(passwordEncoder.encode(vo.getUpdatePwd()));
		return userCommonMapper.updateUser(getUpdateQueryString(vo));
	}

	public int deleteUser(String id) {
		return userCommonMapper.deleteUser(id);
	}

	public List<Map<String,String>> selectUser(UserCommonVO vo) {
		return userCommonMapper.selectUser(getSelectQueryString(vo));
	}

//	public Map<String,Object> selectOne(Map<String,Object> map) {
//		return select(map).get(0);
//	}

	public List<Map<String,String>> search(SearchVO vo) {
		return userCommonMapper.searchUser(vo);
	}

//	public List<Map<String,Object>> selectAll() {
//		return userMapper.selectAll();
//	}

	public void replaceAuthority(String role){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		List<GrantedAuthority> updateAuthorities = new ArrayList<>();

		updateAuthorities.add(new SimpleGrantedAuthority(role));

		Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(),auth.getCredentials(),updateAuthorities);

		SecurityContextHolder.getContext().setAuthentication(newAuth);
	}


	public Map<String,String> getAccountById(String id){
		List<Map<String,String>> adminVO = selectUser(UserCommonVO.builder().id(id).build());
		System.out.println(adminVO);
		if(adminVO != null && !adminVO.isEmpty()){
			return adminVO.get(0);
		}
		return null;
	}

	public Map<String,String> getAccountByEmail(String email){
		List<Map<String,String>> adminVO = selectUser(UserCommonVO.builder().email(email).build());
		if(adminVO != null && !adminVO.isEmpty()){
			return adminVO.get(0);
		}
		return null;
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Map<String,String> map = getAccountById(username);
		if(map == null){
			throw new UsernameNotFoundException(String.format("User {%s} Not Founded!",username));
		}

		String id = map.get("id");
		String pwd = map.get("pwd");
		String role = map.get("role");

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
