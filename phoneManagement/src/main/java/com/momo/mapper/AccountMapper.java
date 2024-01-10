package com.momo.mapper;

import com.momo.vo.UserInfoVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountMapper extends DefaultCRUDMapper<UserInfoVO, UserInfoVO> {
	public int updateRole(UserInfoVO userInfoVO);
	public int updatePassword(UserInfoVO userInfoVO);
}
