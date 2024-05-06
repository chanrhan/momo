package com.momo.mapper;

import com.momo.common.vo.SaleVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SaleMapper{
	public List<Map<String,Object>> getSaleAsCard(SaleVO vo);
	public List<Map<String,Object>> getSaleAsUsedDevice(SaleVO vo);
	public List<Map<String,Object>> getSaleAsCombination(SaleVO vo);
	public List<Map<String,Object>> getSaleAsSupport(SaleVO vo);
	// Sale
	public int insertSale(SaleVO vo);
	public int updateSale(SaleVO vo);
	public int deleteSale(int id);
	public List<Map<String,Object>> getSaleByUserId(SaleVO vo);
	public List<Map<String,Object>> getSaleByShopId(SaleVO vo);

	public boolean isDuplicatedTel(SaleVO vo);
	public String getSpecFilePath(int id);
}
