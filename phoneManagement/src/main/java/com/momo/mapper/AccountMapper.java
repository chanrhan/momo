package com.momo.mapper;

import com.momo.vo.UserInfoVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface AccountMapper extends ICommonMapper<UserInfoVO,UserInfoVO> {
	public int updateRole(UserInfoVO userInfoVO);

	public int updatePassword(UserInfoVO userInfoVO);
}
