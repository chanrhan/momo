package com.momo.mapper;

import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ShopCommonMapper {
	// Shop
	public int insertShop(ShopCommonVO vo);
	public int updateShop(String qs);
	public int deleteShop(int id);
	public List<Map<String,Object>> selectShop(String qs);
	public List<Map<String,Object>> searchShop(SearchVO vo);
	public Integer getMaxShopId();

	// Corperation
	public int insertCorp(ShopCommonVO vo);
	public int updateCorp(String qs);
	public int deleteCorp(String bNo);
	public List<Map<String,Object>> selectCorp(String qs);
	public List<Map<String,Object>> searchCorp(SearchVO vo);
}
