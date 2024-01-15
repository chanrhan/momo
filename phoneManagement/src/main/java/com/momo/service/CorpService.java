package com.momo.service;

import com.momo.mapper.CorpMapper;
import com.momo.vo.CorpVO;
import com.momo.vo.ShopVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CorpService implements DefaultCRUDService<ShopVO, ShopVO> {
	private final CorpMapper corpMapper;

	@Override
	public int insert(ShopVO key) {
		return corpMapper.insert(key);
	}

	@Override
	public int update(ShopVO key) {
		return corpMapper.update(key);
	}

	@Override
	public int delete(ShopVO key) {
		return corpMapper.delete(key);
	}

	@Override
	public List<ShopVO> select(ShopVO key) {
		return corpMapper.select(key);
	}

	public List<ShopVO> search(ShopVO key) {
		return corpMapper.search(key);
	}

	@Override
	public List<ShopVO> selectAll() {
		return corpMapper.selectAll();
	}

}
