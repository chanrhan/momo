package com.momo.mapper;

import com.momo.domain.shop.Shop;
import com.momo.dto.ShopDTO;
import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface ShopMapper extends DefaultCRUDMapper<Shop, ShopDTO> {
	public Shop select(String cd);
	public Integer getMaxCode();
}
