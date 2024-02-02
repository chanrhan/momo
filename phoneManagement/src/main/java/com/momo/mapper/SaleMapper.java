package com.momo.mapper;

import com.momo.vo.MsgCommonVO;
import com.momo.vo.SaleVO;
import com.momo.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SaleMapper{
	// Sale
	public int insertSale(SaleVO vo);
	public int updateSale(SaleVO vo);
	public int deleteSale(int id);
	public List<Map<String,Object>> selectSale(SaleVO vo);
	public List<Map<String,Object>> searchSale(SearchVO vo);
	public Map<String,Object> selectById(int id);
	public Integer getMaxId();
}
