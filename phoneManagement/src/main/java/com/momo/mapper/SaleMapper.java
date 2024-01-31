package com.momo.mapper;

import com.momo.vo.SaleVO;
import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SaleMapper{
	// Sale
	public int insertSale(SaleVO vo);
	public int updateSale(String qs);
	public int deleteSale(int id);
	public List<Map<String,Object>> selectSale(String qs);
	public List<Map<String,Object>> searchSale(SearchVO vo);
	public Map<String,Object> selectById(int id);
	public Integer getMaxSaleNo();
}
