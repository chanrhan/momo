package com.momo.service;

import com.momo.mapper.RoleDetailUserMapper;
import com.momo.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleDetailUserService implements DefaultCRUDService<UserInfoVO, UserInfoVO> {
	private final RoleDetailUserMapper roleDetailUserMapper;

	@Override
	public int insert(UserInfoVO key) {
		return roleDetailUserMapper.insert(key);
	}

	@Override
	public List<UserInfoVO> select(UserInfoVO key) {
		return roleDetailUserMapper.select(key);
	}

	@Override
	public int update(UserInfoVO key) {
		return roleDetailUserMapper.update(key);
	}

	@Override
	public int delete(UserInfoVO key) {
		return roleDetailUserMapper.delete(key);
	}

	@Override
	public List<UserInfoVO> selectAll() {
		return roleDetailUserMapper.selectAll();
	}
}
