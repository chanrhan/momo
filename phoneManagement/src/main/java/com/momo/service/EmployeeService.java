package com.momo.service;

import com.momo.mapper.EmployeeMapper;
import com.momo.vo.CommonVO;
import com.momo.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmployeeService extends CommonService<UserInfoVO,UserInfoVO> {
	private final EmployeeMapper employeeMapper;

	@Override
	public int insert(UserInfoVO map) {
		return employeeMapper.insert(map);
	}

	@Override
	public List<UserInfoVO> select(UserInfoVO map) {
		return employeeMapper.select(getSelectQueryString(map));
	}

	@Override
	public List<UserInfoVO> search(CommonVO commonVO) {
		return employeeMapper.search(commonVO);
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
		UserInfoVO empMap = employeeMapper.selectById(userInfoVO.getId());
		empMap.setShopCd(userInfoVO.getShopCd());
		return employeeMapper.updateShop(empMap);
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
