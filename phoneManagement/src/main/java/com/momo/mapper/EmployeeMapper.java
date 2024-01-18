package com.momo.mapper;

import com.momo.vo.UserInfoVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmployeeMapper extends DefaultCRUDMapper<UserInfoVO, UserInfoVO> {
	public UserInfoVO selectById(String id);
	public int updateShop(UserInfoVO userInfoVO);
}
