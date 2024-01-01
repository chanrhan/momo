package com.momo.service;

import com.momo.domain.shop.Shop;
import com.momo.dto.ShopDTO;
import com.momo.mapper.DefaultCRUDMapper;
import com.momo.mapper.ShopMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService implements DefaultCRUDMapper<Shop, ShopDTO> {
	private final ShopMapper shopMapper;

	@Override
	public int insert(ShopDTO key) {
		return shopMapper.insert(key);
	}

	public Shop select(String cd){
		return shopMapper.select(cd);
	}

	@Override
	public int update(ShopDTO key) {
		return shopMapper.update(key);
	}

	@Override
	public int delete(ShopDTO key) {
		return shopMapper.delete(key);
	}

	@Override
	public List<Shop> search(ShopDTO key) {
		return shopMapper.search(key);
	}

	@Override
	public List<Shop> selectAll() {
		return shopMapper.selectAll();
	}

	public String hashToShopCode(String shopName, String shopAddr){

		return null;
	}
}
