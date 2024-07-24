package com.momo.service;

import com.momo.mapper.ShopMapper;
import com.momo.common.vo.ShopVO;
import com.momo.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShopService extends CommonService {
	private final ShopMapper shopMapper;
	private final UserMapper userMapper;
	private final NotificationService notificationService;

	public int updateSendTel(ShopVO vo){
		return shopMapper.updateShop(vo);
	}

	// Common
	// Shop
	public void insertShop(ShopVO vo) {
		shopMapper.insertShop(vo);
	}

	public int updateShop(ShopVO vo) {
		return shopMapper.updateShop(vo);
	}

	public int deleteShop(int id) {
		return shopMapper.deleteShop(id);
	}

	public List<Map<String,Object>> getShop(ShopVO vo) {
		return shopMapper.getShop(vo);
	}

	public List<Map<String ,String>> getShopItems(String userId){
		return shopMapper.getShopItems(userId);
	}

	public Map<String,Object> getShopById(int id){
		ShopVO vo = ShopVO.builder().shopId(id).build();
		return shopMapper.getShop(vo).get(0);
	}

	@Transactional
	public boolean joinShop(String userId, int shopId){
		shopMapper.joinShop(userId, shopId);
		String receiverId = userMapper.getBMIdByShop(shopId);

		StringBuilder sb = new StringBuilder();
		sb.append(userId).append("님의 매장 가입 요청입니다.");

		notificationService.sendMessage(userId, receiverId, sb.toString());
		return true;
	}

}
