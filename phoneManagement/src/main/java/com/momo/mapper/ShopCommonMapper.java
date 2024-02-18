package com.momo.mapper;

import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


@Mapper
public interface ShopCommonMapper {
	public String getBpNoByShopId(int id);

	// Shop
	public int insertShop(ShopCommonVO vo);
	public int updateShop(ShopCommonVO vo);
	public int deleteShop(int id);
	public List<Map<String,Object>> selectShop(ShopCommonVO vo);
	public List<Map<String,Object>> searchShop(SearchVO vo);
	public Integer getMaxShopId();

	// Corperation
	public int insertCorp(ShopCommonVO vo);
	public int updateCorp(ShopCommonVO vo);
	public int deleteCorp(String bNo);
	public List<Map<String,Object>> selectCorp(ShopCommonVO vo);
	public List<Map<String,Object>> searchCorp(SearchVO vo);
	public Integer getMaxCorpId();
}
