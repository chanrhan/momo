package com.momo.service;

import com.momo.domain.shop.Shop;
import com.momo.mapper.DefaultCRUDMapper;
import com.momo.mapper.ShopMapper;
import com.momo.vo.ShopVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService implements DefaultCRUDMapper<ShopVO, ShopVO> {
	private final ShopMapper shopMapper;

	@Override
	public int insert(ShopVO key) {
		return shopMapper.insert(key);
	}

	@Override
	public int update(ShopVO key) {
		return shopMapper.update(key);
	}

	@Override
	public int delete(ShopVO key) {
		return shopMapper.delete(key);
	}

	@Override
	public List<ShopVO> search(ShopVO key) {
		return shopMapper.search(key);
	}

	@Override
	public List<ShopVO> selectAll() {
		return shopMapper.selectAll();
	}

	public int getMaxCode(){
		Integer code = shopMapper.getMaxCode();
		if(code == null){
			return 0;
		}
		return code;
	}
}
