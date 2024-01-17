package com.momo.service;

import com.momo.mapper.SaleMapper;
import com.momo.vo.SaleVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService implements DefaultCRUDService<SaleVO, SaleVO> {
	private final SaleMapper saleMapper;

	public List<SaleVO> getDetailByShopCode(SaleVO saleVO){
		return saleMapper.getDetailByShopCode(saleVO);
	}

	@Override
	public int insert(SaleVO key) {
		return saleMapper.insert(key);
	}

	@Override
	public List<SaleVO> select(SaleVO key) {
		return saleMapper.select(key);
	}

	@Override
	public SaleVO selectOne(SaleVO key) {
		return select(key).get(0);
	}

	@Override
	public int update(SaleVO key) {
		return saleMapper.update(key);
	}

	@Override
	public int delete(SaleVO key) {
		return saleMapper.delete(key);
	}

	@Override
	public List<SaleVO> selectAll() {
		return saleMapper.selectAll();
	}
}
