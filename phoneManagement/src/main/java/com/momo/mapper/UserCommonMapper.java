package com.momo.mapper;

import com.momo.vo.SearchVO;
import com.momo.vo.UserCommonVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserCommonMapper {
	// User Account
	public int insertUser(UserCommonVO vo);
	public int updateUser(String qs);
	public int deleteUser(String id);
	public List<Map<String,Object>> selectUser(String qs);
	public List<Map<String,Object>> searchUser(SearchVO vo);

	// Employee
	public int insertEmp(UserCommonVO vo);
	public int updateEmp(String qs);
	public int deleteEmp(String id);
	public List<Map<String,Object>> selectEmp(String qs);
	public List<Map<String,Object>> searchEmp(SearchVO vo);
//	public int updateRole(Map<String,Object> map);
//	public int updatePassword(Map<String,Object> map);
}
