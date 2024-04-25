package com.momo.mapper;

import com.momo.common.vo.SaleVO;
import com.momo.common.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SaleMapper{
	public List<Map<String,Object>> fetchCardSale(SaleVO vo);
	public List<Map<String,Object>> fetchGreenPhoneSale(SaleVO vo);
	public List<Map<String,Object>> fetchCombSale(SaleVO vo);
	public List<Map<String,Object>> fetchSupportSale(SaleVO vo);
	// Sale
	public int insertSale(SaleVO vo);
	public int updateSale(SaleVO vo);
	public int deleteSale(int id);
	public List<Map<String,Object>> selectSale(SaleVO vo);
	public List<Map<String,Object>> fetchSale(SaleVO vo);

	public List<Map<String,Object>> searchSale(SearchVO vo);
	public boolean isDuplicatedTel(SaleVO vo);
	public String getSpecFilePath(int id);
}
