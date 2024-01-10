package com.momo.service;

import com.momo.mapper.AccountMapper;
import com.momo.mapper.DefaultCRUDMapper;
import com.momo.vo.AccountVO;
import com.momo.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService implements DefaultCRUDMapper<UserInfoVO,UserInfoVO>, UserDetailsService{
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
		return accountMapper.insert(userInfoVO);
	}

	public int setRole(UserInfoVO userInfoVO){
		return accountMapper.setRole(userInfoVO);
	}

	public UserInfoVO getAccountById(String id){
		List<UserInfoVO> adminVO = accountMapper.search(UserInfoVO.builder().id(id).build());
		if(adminVO != null && !adminVO.isEmpty()){
			return adminVO.get(0);
		}
		return null;
	}

	public UserInfoVO getAccountByEmail(String email){
		List<UserInfoVO> adminVO = accountMapper.search(UserInfoVO.builder().email(email).build());
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
