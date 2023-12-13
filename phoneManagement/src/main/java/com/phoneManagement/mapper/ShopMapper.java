package com.phoneManagement.mapper;

import com.phoneManagement.domain.shop.Shop;
import com.phoneManagement.dto.ShopDTO;
import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface ShopMapper extends DefaultCRUDMapper<Shop, ShopDTO> {
	public Shop select(String cd);
}
