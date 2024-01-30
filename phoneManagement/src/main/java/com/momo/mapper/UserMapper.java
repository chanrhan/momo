package com.momo.mapper;

import com.momo.vo.SearchVO;
import com.momo.vo.UserCommonVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
	// User Account
	public int insertUser(UserCommonVO vo);
	public int updateUser(UserCommonVO vo);
	public int deleteUser(String id);
	public List<Map<String,String>> selectUser(UserCommonVO vo);
	public List<Map<String,String>> searchUser(SearchVO vo);

	// Employee
	public int insertEmp(UserCommonVO vo);
	public int updateEmp(UserCommonVO vo);
	public int deleteEmp(String id);
	public List<Map<String,String>> selectEmp(UserCommonVO vo);
//	public int updateRole(Map<String,Object> map);
//	public int updatePassword(Map<String,Object> map);
}
