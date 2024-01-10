package com.momo.mapper;

import com.momo.vo.UserInfoVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoleDetailUserMapper extends DefaultCRUDMapper<UserInfoVO, UserInfoVO> {

}
