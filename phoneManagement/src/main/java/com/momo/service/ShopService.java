package com.momo.service;

import com.momo.common.vo.UserVO;
import com.momo.mapper.ShopMapper;
import com.momo.common.vo.ShopVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShopService extends CommonService {
	private final ShopMapper shopMapper;

	public int updateSendTel(ShopVO vo){
		return shopMapper.updateShop(vo);
	}

	// Common
	// Shop
	public int insertShop(ShopVO vo) {
		return shopMapper.insertShop(vo);
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

	public Map<String,Object> getShopById(int id){
		ShopVO vo = ShopVO.builder().shopId(id).build();
		return shopMapper.getShop(vo).get(0);
	}

	// Corperation
	public int insertCorp(ShopVO vo) {
		Integer result = transactionTemplate.executeRepeatedly(status -> shopMapper.insertCorp(vo));
		return (result != null) ? result : 0;
	}

	public int updateCorp(ShopVO vo) {
		return shopMapper.updateCorp(vo);
	}

	public int deleteCorp(String bNo) {
		return shopMapper.deleteCorp(bNo);
	}

	public List<Map<String,Object>> getCorporation(ShopVO vo) {
		return shopMapper.getCorporation(vo);
	}

	public Map<String,Object> getCorporationById(int id) {
		ShopVO vo = ShopVO.builder().corpId(id).build();
		return shopMapper.getCorporation(vo).get(0);
	}


	public int updateCorpPoint(int corpId, int amount){
		if(amount == 0){
			return 0;
		}
		return shopMapper.updateCorpPoint(corpId, amount);
	}

}
