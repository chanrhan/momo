package com.momo.service;

import com.momo.mapper.EmployeeMapper;
import com.momo.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService implements DefaultCRUDService<UserInfoVO, UserInfoVO> {
	private final EmployeeMapper employeeMapper;

	@Override
	public int insert(UserInfoVO key) {
		return employeeMapper.insert(key);
	}

	@Override
	public List<UserInfoVO> select(UserInfoVO key) {
		return employeeMapper.select(key);
	}

	public UserInfoVO selectById(String id){
		return employeeMapper.selectById(id);
	}

	@Override
	public UserInfoVO selectOne(UserInfoVO key) {
		return select(key).get(0);
	}

	@Override
	public int update(UserInfoVO key) {
		return employeeMapper.update(key);
	}

	public int updateShop(UserInfoVO userInfoVO){
		UserInfoVO user = employeeMapper.selectById(userInfoVO.getId());
		user.setShopCd(userInfoVO.getShopCd());
		return employeeMapper.updateShop(user);
	}

	@Override
	public int delete(UserInfoVO key) {
		return employeeMapper.delete(key);
	}

	@Override
	public List<UserInfoVO> selectAll() {
		return employeeMapper.selectAll();
	}
}
