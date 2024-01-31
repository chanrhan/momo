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
	public int updateUser(String qs);
	public int deleteUser(String id);
	public List<Map<String,String>> selectUser(String qs);
	public List<Map<String,String>> searchUser(SearchVO vo);

	// Employee
	public int insertEmp(UserCommonVO vo);
	public int updateEmp(String qs);
	public int deleteEmp(String id);
	public List<Map<String,String>> selectEmp(String qs);
//	public int updateRole(Map<String,Object> map);
//	public int updatePassword(Map<String,Object> map);
}
