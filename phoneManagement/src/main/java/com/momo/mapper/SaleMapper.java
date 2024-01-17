package com.momo.mapper;

import com.momo.service.DefaultCRUDService;
import com.momo.vo.SaleVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SaleMapper extends DefaultCRUDService<SaleVO, SaleVO> {
	public List<SaleVO> getDetailByShopCode(SaleVO saleVO);
}
