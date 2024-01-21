package com.momo.service;

import com.momo.domain.Paging;
import com.momo.mapper.ShopMapper;
import com.momo.vo.ShopVO;
import com.momo.vo.RegionVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService implements DefaultCRUDService<ShopVO, ShopVO> {
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
	public List<ShopVO> select(ShopVO key) {
		return shopMapper.select(key);
	}

	@Override
	public ShopVO selectOne(ShopVO key) {
		return select(key).get(0);
	}

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

	public List<ShopVO> searchByRegion(RegionVO regionVO){
		return shopMapper.searchByRegion(regionVO);
	}

	public Paging<ShopVO> searchBranch(ShopVO shopVO){
		Paging<ShopVO> paging = new Paging<>(shopVO.getPage(), 10);
		shopVO.setOffset(paging.getOffset());
		shopVO.setLimit(paging.getSize());
//		ShopVO vo = ShopVO.builder()
////				.keywordMap(keyword)
//				.offset(paging.getOffset())
//				.limit(paging.getSize())
//				.build();

		paging.setRecords(shopMapper.searchBranch(shopVO));
		paging.setTotalRecordCount(shopMapper.countBranch(shopVO));

		return paging;
	}

	public Paging<ShopVO> selectPage(int pageNum, String targetColumn, String keyword){
		Paging<ShopVO> paging = new Paging<>(pageNum, 10);
		ShopVO vo = ShopVO.builder()
				.offset(paging.getOffset())
				.limit(paging.getSize())
				.build();

		paging.setRecords(shopMapper.search(vo));
		paging.setTotalRecordCount(shopMapper.getTotalRecordCount(vo));

		return paging;
	}
}
