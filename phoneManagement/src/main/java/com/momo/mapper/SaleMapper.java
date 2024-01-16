package com.momo.mapper;

import com.momo.service.DefaultCRUDService;
import com.momo.vo.SaleVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SaleMapper extends DefaultCRUDService<SaleVO, SaleVO> {

}
