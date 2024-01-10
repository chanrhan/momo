package com.momo.mapper;

import com.momo.domain.shop.Shop;
import com.momo.vo.ShopVO;
import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface ShopMapper extends DefaultCRUDMapper<ShopVO, ShopVO> {
	public ShopVO select(String cd);
	public Integer getMaxCode();
}
