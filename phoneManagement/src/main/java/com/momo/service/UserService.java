package com.momo.service;

import com.momo.common.UserDetailsImpl;
import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.SearchVO;
import com.momo.common.vo.UserVO;
import com.momo.mapper.UserMapper;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService extends CommonService implements UserDetailsService{
	private final PasswordEncoder  passwordEncoder;
	private final UserMapper       userMapper;

	// Authentication
	public List<Map<String,Object>> getStaffList(String id){
		return userMapper.getStaffList(id);
	}

	public int updateCurrentShop(String userId, int shopId){
		return userMapper.updateCurrentShop(userId, shopId);
	}
	public int updateNickname(String id, String nickname){
		return userMapper.updateNickname(id, nickname);
	}

	public int resetPassword(UserVO vo){
		vo.setPwd(passwordEncoder.encode(vo.getPwd()));
		return userMapper.resetPassword(vo);
	}
	public boolean existUserId(String id){
		return userMapper.existUserId(id);
	}

	public List<Map<String,Object>> tryFindUserIdByTel(UserVO vo){
		return userMapper.tryFindUserIdByTel(vo);
	}

	public List<Map<String,Object>> tryFindUserIdByEmail(UserVO vo){
		return userMapper.tryFindUserIdByEmail(vo);
	}

	public void sendAuthNumberByEmailForUpdatePassword(String id){

	}

	public void sendAuthNumberByTelForUpdatePassword(String id){

	}

	public Map<String,Object> getTelEmailSecretly(String id){
		Map<String,Object> map = userMapper.findTelEmailById(id);

		String tel = map.get("tel").toString();
		String email = map.get("email").toString();

		if(tel == null || email == null){
			return null;
		}
		map.put("tel", tel.substring(0, tel.length()-3) + "****");

		int idx = email.indexOf('@');
		StringBuilder sb = new StringBuilder(email);
		sb.replace(Math.max(idx - 4, 0), idx, "****");
		map.put("email", sb.toString());

		return map;
	}

	public boolean matchUserIdTel(UserVO vo){
		return userMapper.matchUserIdTel(vo);
	}

	public boolean matchUserIdEmail(UserVO vo){
		return userMapper.matchUserIdEmail(vo);
	}

	public void loginNow(String id){
		userMapper.loginNow(id);
	}

	public int updateUserToDormant(int date){
		return userMapper.updateUserToDormant(date);
	}

	public List<Map<String,Object>> selectUserInfo(UserVO vo){
		if(vo.getOrder() == null){
			vo.setOrder("regi_dt");
		}
		return userMapper.selectUserInfo(vo);
	}

	public List<Map<String,Object>> searchUserInfo(SearchVO vo){
		return userMapper.searchUserInfo(vo);
	}

	public Map<String,Object> getUserInfo(String id){
		return userMapper.getUserInfo(id);
	}
	// Common
	public Authentication loginDirectly(String username, HttpSession session){
		UserDetails user = loadUserByUsername(username);
		Authentication authentication  = new UsernamePasswordAuthenticationToken(user,"",user.getAuthorities());

		SecurityContext context = SecurityContextHolder.createEmptyContext();
		context.setAuthentication(authentication);
		SecurityContextHolder.setContext(context);
		// 수정된 context를 현재 session에 넣어줘야 로그인 상태가 유지된다.
		session.setAttribute("SPRING_SECURITY_CONTEXT", context);
		return authentication;
	}

	// User Account
	public int insertUser(UserVO vo){
		vo.setPwd(passwordEncoder.encode(vo.getPwd()));
		return userMapper.insertUser(vo);
	}
	public int updateUser(UserVO vo){
		return userMapper.updateUser(vo);
	}

	public int updatePassword(UserVO vo){
		vo.setUpdatePwd(passwordEncoder.encode(vo.getUpdatePwd()));
		return userMapper.updatePassword(vo);
	}
	public int updateApproval(String id, boolean state){
		UserVO vo = UserVO.builder().empId(id).approvalSt(state).build();
		return updateEmp(vo);
	}
	public int updatePfp(UserVO vo){
		return userMapper.updatePfp(vo);
	}
	public String getPfpFilePath(String id){
		return userMapper.getPfpFilePath(id);
	}
	public int deleteUser(String id) {
		return userMapper.deleteUser(id);
	}

	public List<Map<String,Object>> selectUser(UserVO vo) {
		return userMapper.selectUser(vo);
	}

	public Map<String,Object> selectUserByContext(){
		String username = SecurityContextUtil.getUsername();
		return selectUserById(username);
	}

	public Map<String,Object> selectUserById(String id){
		List<Map<String,Object>> list = userMapper.selectUserById(id);
		if(list == null || list.isEmpty()){
			return null;
		}
		return list.get(0);
	}

	public Map<String,Object> selectUserByEmail(String email){
		List<Map<String,Object>> list = selectUser(UserVO.builder().email(email).build());
		if(list == null || list.isEmpty()){
			return null;
		}
		return list.get(0);
	}

	public List<Map<String,Object>> searchUser(SearchVO vo) {
		return userMapper.searchUser(vo);
	}

	public List<Map<String,Object>> searchChatInvitableUser(SearchVO vo){
		return userMapper.searchChatInvitableUser(vo);
	}

	public int updateRole(String id, String role){
		UserVO vo = UserVO.builder().id(id).role(role).build();
		return userMapper.updateUser(vo);
	}


	// Employee
	public int insertEmp(UserVO vo){
		if(vo.getApprovalSt() == null){
			vo.setApprovalSt(false);
		}
		// 이거 임시 코드임. 나중에 수정
		if(vo.getShopId() == null){
			vo.setShopId(0);
		}

		return userMapper.insertEmp(vo);
	}
	public int updateEmp(UserVO vo){
		return userMapper.updateEmp(vo);
	}

	public int deleteEmp(String id) {
		return userMapper.deleteEmp(id);
	}

	public List<Map<String,Object>> selectEmp(UserVO vo) {
		return userMapper.selectEmp(vo);
	}
	public Map<String,Object> selectEmpById(String id){
		UserVO                   vo   = UserVO.builder().empId(id).build();
		List<Map<String,Object>> list = selectEmp(vo);
		if(list == null || list.isEmpty()){
			return null;
		}
		return list.get(0);
	}

	public List<Map<String,Object>> searchEmp(SearchVO vo) {
		return userMapper.searchEmp(vo);
	}

	public void replaceAuthority(String role){
		replaceAuthority(role, false);
	}

	public void replaceAuthority(String role, boolean approve){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		List<GrantedAuthority> updateAuthorities = new ArrayList<>();

		updateAuthorities.add(new SimpleGrantedAuthority(role));
		if(approve){
			updateAuthorities.add(new SimpleGrantedAuthority("APPROVE"));
		}

		Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(),auth.getCredentials(),updateAuthorities);

		SecurityContextHolder.getContext().setAuthentication(newAuth);
	}

	public Authentication login(String username, String password){
		Authentication authentication = authenticate(username, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);


		return authentication;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Map<String,Object> user = selectUserById(username);
		if(user == null){
			throw new UsernameNotFoundException(String.format("User %s Not Founded!",username));
		}

		String id = user.get("id").toString();
		String pwd = user.get("pwd").toString();
		String role = user.get("role").toString();

		UserDetailsImpl userDetails = new UserDetailsImpl(id, pwd, "ROLE_"+role);

		if(role.equals("NONE")){
			return userDetails;
		}

		if(!role.equals("ADMIN") && !role.equals("CUSTOMER") ){
//			Map<String,Object> emp = selectEmp(UserVO.builder().empId(id).build()).get(0);
			if(userMapper.isApproved(id)){
//				System.out.println("success!");
				userDetails.add(new SimpleGrantedAuthority("APPROVE"));
			}
		}

		return userDetails;
	}


	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = loadUserByUsername(username);

		if (userDetails == null) {
			System.out.println("Login details - null " + userDetails);
			throw new BadCredentialsException("Invalid username and password");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			System.out.println("Login userDetails - password mismatch" + userDetails);
			throw new BadCredentialsException("Invalid password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
}
