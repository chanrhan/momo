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
public class UserCommonService extends CommonService implements UserDetailsService{
	private final PasswordEncoder  passwordEncoder;
	private final UserCommonMapper userCommonMapper;

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
	public int updateApproveState(String id, boolean state){
		UserCommonVO vo = UserCommonVO.builder().id(id).approvalSt(state).build();
		return updateEmp(vo);
	}

	public int deleteUser(String id) {
		return userCommonMapper.deleteUser(id);
	}

	public List<Map<String,Object>> selectUser(UserCommonVO vo) {
		return userCommonMapper.selectUser(getSelectQueryString(vo));
	}
	public Map<String,Object> selectUserById(String id){
		UserCommonVO vo = UserCommonVO.builder().id(id).build();
		return selectUser(vo).get(0);
	}

	public Map<String,Object> selectUserByEmail(String email){
		UserCommonVO vo = UserCommonVO.builder().email(email).build();
		return selectUser(vo).get(0);
	}

	public List<Map<String,Object>> searchUser(SearchVO vo) {
		return userCommonMapper.searchUser(vo);
	}

	public int updateRole(String id, String role){
		UserCommonVO vo = UserCommonVO.builder().id(id).role(role).build();
		return userCommonMapper.updateUser(getUpdateQueryString(vo));
	}


	// Employee
	public int insertEmp(UserCommonVO vo){
		return userCommonMapper.insertEmp(vo);
	}
	public int updateEmp(UserCommonVO vo){
		return userCommonMapper.updateEmp(getUpdateQueryString(vo));
	}

	public int deleteEmp(String id) {
		return userCommonMapper.deleteEmp(id);
	}

	public List<Map<String,Object>> selectEmp(UserCommonVO vo) {
		return userCommonMapper.selectEmp(getSelectQueryString(vo));
	}
	public Map<String,Object> selectEmpById(String id){
		UserCommonVO vo = UserCommonVO.builder().id(id).build();
		return selectEmp(vo).get(0);
	}

	public List<Map<String,Object>> searchEmp(SearchVO vo) {
		return userCommonMapper.searchEmp(vo);
	}

	public void replaceAuthority(String role){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		List<GrantedAuthority> updateAuthorities = new ArrayList<>();

		updateAuthorities.add(new SimpleGrantedAuthority(role));

		Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(),auth.getCredentials(),updateAuthorities);

		SecurityContextHolder.getContext().setAuthentication(newAuth);
	}




	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Map<String,Object> map = selectEmpById(username);
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
			Map<String,Object> emp = selectEmp(UserCommonVO.builder().id(id).build()).get(0);
			if(emp.get("approve_st").equals("1")){
				userDetails.add(new SimpleGrantedAuthority("APPROVE"));
			}
		}

		return userDetails;
	}
}
