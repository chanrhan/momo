package com.momo.mapper;

import com.momo.common.vo.SearchVO;
import com.momo.common.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
	public String getName(String id);

	public String getBMIdByShop(int shopId);

	public List<Map<String,String>> getInnerStaff(String userId);
	public List<Map<String,Object>> getInnerStaffAll(String userId, String keyword);
	public List<String> getInnerStaffName(String userId);
//	public String getUserByBrNo(String brNo);
	public List<Map<String,Object>> findUserByTelEmail(String tel, String email);

	public List<Map<String,Object>> getStaffByShopId(String shopId);

	public int updateApprovalState(String userId, String staffId, int state);

//	public int updateCurrentShop(String userId, int shopId);
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
	public Map<String,Object> getUserAsAuthorization(String userId);

	/**
	 *
	 * @param userId string
	 * @return {
	 * 	   아이디
	 *     이름
	 *     역할
	 *     회사명
	 *     매장명
	 * }
	 */
	public Map<String,Object> getUserByUserAndShop(String userId);
	public List<Map<String,Object>> getUser(UserVO vo);

	// Staff
	public int insertStaff(UserVO vo);
	public int updateStaff(UserVO vo);
	public int deleteStaff(String id);

	public Integer getInnerStaffTotalCount(String userId);

//	public List<Map<String,Object>> getUserAsStaff(UserVO vo);
//	public List<Map<String,Object>> searchEmp(SearchVO vo);
	public boolean isApproved(String id);
}
