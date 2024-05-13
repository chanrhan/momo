package com.momo.mapper;

import com.momo.common.vo.SearchVO;
import com.momo.common.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
	public String getUserByBpNo(String bpNo);

	public List<Map<String,Object>> getUserAsStaff(String id);

	public int updateCurrentShop(String userId, int shopId);
	public int updateNickname(String id, String nickname);

	public int updatePassword(UserVO vo);
	public int resetPassword(UserVO vo);

	public Map<String,Object> findTelEmailById(String id);

	public boolean existUserId(String userId);
	public boolean existEmail(String email);

	public boolean matchUserId(UserVO vo);

	public String getProfilePicture(String id);
	public int updatePfp(UserVO vo);

	public Map<String,Object> getConnectedUser(String id);

	public int loginNow(String id);
	public List<Map<String,Object>> getChatInvitableUser(SearchVO vo);

	public int updateUserToDormant(int date);

	// User Account
	public int insertUser(UserVO vo);
	public int updateUser(UserVO vo);
	public int deleteUser(String id);
	public Map<String,String> getUserAsAuthorization(String userId);
	public Map<String,Object> getUserById(String userId);
	public List<Map<String,Object>> getUser(UserVO vo);

	// Employee
	public int insertEmp(UserVO vo);
	public int updateEmp(UserVO vo);
	public int deleteEmp(String id);
	public List<Map<String,Object>> getUserAsStaff(UserVO vo);
	public List<Map<String,Object>> searchEmp(SearchVO vo);
	public boolean isApproved(String id);
}
