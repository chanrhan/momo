package com.momo.mapper;

import com.momo.vo.UserInfoVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface EmployeeMapper extends ICommonMapper<UserInfoVO,UserInfoVO> {
	public UserInfoVO selectById(String id);
	public int updateShop(UserInfoVO userInfoVO);
}
