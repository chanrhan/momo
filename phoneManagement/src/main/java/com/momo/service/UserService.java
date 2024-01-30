package com.momo.service;

import com.momo.domain.user.UserDetailsImpl;
import com.momo.mapper.UserMapper;
import com.momo.mapper.EmployeeMapper;
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
	private final PasswordEncoder passwordEncoder;
	private final UserMapper      userMapper;

	private final EmployeeMapper employeeMapper;

	// User Account
	public int insertUser(UserCommonVO vo){
		vo.setPwd(passwordEncoder.encode(vo.getPwd()));
		return userMapper.insertUser(vo);
	}
	public int updateUser(UserCommonVO vo){
		return userMapper.updateUser(vo);
	}

	public int deleteUser(String id) {
		return userMapper.deleteUser(id);
	}

	public List<Map<String,String>> selectUser(UserCommonVO vo) {
		return userMapper.selectUser(getSelectQueryString(vo));
	}

//	public Map<String,Object> selectOne(Map<String,Object> map) {
//		return select(map).get(0);
//	}

	public List<Map<String,String>> search(SearchVO vo) {
		return userMapper.searchUser(vo);
	}

//	public List<Map<String,Object>> selectAll() {
//		return userMapper.selectAll();
//	}

	public int updatePassword(Map<String,Object> map){
		map.put("update_pwd", passwordEncoder.encode(map.get("update_pwd").toString()));
		return userMapper.updatePassword(map);
	}



	public int updateRole(Map<String,Object> map){
		return userMapper.updateRole(map);
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
