package com.momo.mapper;

import com.momo.vo.SearchVO;
import com.momo.vo.UserCommonVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserCommonMapper {
	public Map<String,Object> getConnectedUser(String id);
	public int loginNow(String id);
	public List<Map<String,Object>> searchChatInvitableUser(SearchVO vo);

	public int updateUserToDormant(int date);
	public List<Map<String,Object>> searchUserInfo(SearchVO vo);
	public List<Map<String,Object>> selectUserInfo(UserCommonVO vo);

	// User Account
	public int insertUser(UserCommonVO vo);
	public int updateUser(UserCommonVO vo);
	public int deleteUser(String id);
	public List<Map<String,Object>> selectUser(UserCommonVO vo);
	public List<Map<String,Object>> searchUser(SearchVO vo);

	// Employee
	public int insertEmp(UserCommonVO vo);
	public int updateEmp(UserCommonVO vo);
	public int deleteEmp(String id);
	public List<Map<String,Object>> selectEmp(UserCommonVO vo);
	public List<Map<String,Object>> searchEmp(SearchVO vo);
//	public int updateRole(Map<String,Object> map);
//	public int updatePassword(Map<String,Object> map);
}
