package com.momo.service;

import com.momo.domain.Paging;
import com.momo.mapper.SaleMapper;
import com.momo.vo.SaleVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService implements DefaultCRUDService<SaleVO, SaleVO> {
	private final SaleMapper saleMapper;

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

	public Paging<SaleVO> selectPage(int page, SaleVO saleVO){
		Paging<SaleVO> paging = new Paging<>(page, 10);
		saleVO.setOffset(paging.getOffset());
		saleVO.setLimit(paging.getSize());

		paging.setRecords(saleMapper.select(saleVO));
		paging.setTotalRecordCount(saleMapper.countSelect(saleVO));

		return paging;
	}

	public Paging<SaleVO> searchPage(int page, SaleVO saleVO){
		Paging<SaleVO> paging = new Paging<>(page, 10);
		saleVO.setOffset(paging.getOffset());
		saleVO.setLimit(paging.getSize());

		paging.setRecords(saleMapper.search(saleVO));
		paging.setTotalRecordCount(saleMapper.countSearch(saleVO));

		return paging;
	}
}
