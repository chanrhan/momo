package com.momo.mapper;

import com.momo.common.vo.ShopVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


@Mapper
public interface ShopMapper {
	// Shop
	public int insertShop(ShopVO vo);
	public int updateShop(ShopVO vo);
	public int deleteShop(int shopId);
	public List<Map<String,Object>> getShop(ShopVO vo);
	public List<Map<String,String>> getShopItems(String userId);

	// Corperation
//	public boolean existBpNo(String bpNo);
//	public int insertCorp(ShopVO vo);
//	public int updateCorp(ShopVO vo);
//	public int updateCorpPoint(int id, int amount);
//	public int deleteCorp(int id);
//	public List<Map<String,Object>> getCorp(ShopVO vo);
}
