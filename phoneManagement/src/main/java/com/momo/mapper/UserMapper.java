package com.momo.mapper;

import com.momo.common.vo.SearchVO;
import com.momo.common.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
	public int updateNickname(String id, String nickname);
	public int resetPassword(UserVO vo);
	public Map<String,Object> findTelEmailById(String id);
	public boolean existUserId(String id);
	public boolean matchUserIdTel(UserVO vo);
	public boolean matchUserIdEmail(UserVO vo);
	public String getPfpFilePath(String id);
	public int updatePfp(UserVO vo);
	public List<Map<String,Object>> tryFindUserIdByTel(UserVO vo);
	public List<Map<String,Object>> tryFindUserIdByEmail(UserVO vo);
	public Map<String,Object> getConnectedUser(String id);
	public int loginNow(String id);
	public List<Map<String,Object>> searchChatInvitableUser(SearchVO vo);

	public int updateUserToDormant(int date);
	public List<Map<String,Object>> searchUserInfo(SearchVO vo);
	public List<Map<String,Object>> selectUserInfo(UserVO vo);

	public Map<String,Object> selectUserSidebarInfo(String id);

	// User Account
	public int insertUser(UserVO vo);
	public int updateUser(UserVO vo);
	public int deleteUser(String id);
	public List<Map<String,Object>> selectUser(UserVO vo);
	public List<Map<String,Object>> selectUserById(String id);
	public List<Map<String,Object>> searchUser(SearchVO vo);

	// Employee
	public int insertEmp(UserVO vo);
	public int updateEmp(UserVO vo);
	public int deleteEmp(String id);
	public List<Map<String,Object>> selectEmp(UserVO vo);
	public List<Map<String,Object>> searchEmp(SearchVO vo);
	public boolean isApproved(String id);
}
