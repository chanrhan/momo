package com.momo.mapper;

import com.momo.vo.SaleVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface SaleMapper extends ICommonMapper<SaleVO,SaleVO> {
	public SaleVO selectById(int id);
	public Integer getMaxSaleNo();
}
