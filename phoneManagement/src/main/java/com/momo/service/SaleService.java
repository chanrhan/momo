package com.momo.service;

import com.momo.mapper.SaleMapper;
import com.momo.vo.CommonVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SaleService extends CommonService {
	private final SaleMapper saleMapper;

	@Override
	public int insert(Map<String,Object> map) {
		map.put("sale_no", getMaxSaleNo()+1);
		return saleMapper.insert(map);
	}

	@Override
	public List<Map<String,Object>> select(Map<String,Object> map) {
		return saleMapper.select(getSelectQueryString(map));
	}

	@Override
	public Map<String,Object> selectOne(Map<String,Object> map) {
		return select(map).get(0);
	}

	public Map<String,Object> selectById(int id){
		return saleMapper.selectById(id);
	}

	@Override
	public int update(Map<String,Object> key) {
		return saleMapper.update(key);
	}

	@Override
	public int delete(Map<String,Object> key) {
		return saleMapper.delete(key);
	}

	@Override
	public List<Map<String,Object>> selectAll() {
		return saleMapper.selectAll();
	}

	public int getMaxSaleNo(){
		Integer result = saleMapper.getMaxSaleNo();
		if(result == null){
			return 0;
		}
		return result;
	}

	public List<Map<String,Object>> search(CommonVO commonVO){
		return saleMapper.search(commonVO);
	}

//	public Paging<SaleVO> selectPage(int page, SaleVO saleVO){
//		Paging<SaleVO> paging = new Paging<>(page, 10);
//		saleVO.setOffset(paging.getOffset());
//		saleVO.setLimit(paging.getSize());
//
//		paging.setRecords(saleMapper.select(saleVO));
//		paging.setTotalRecordCount(saleMapper.countSelect(saleVO));
//
//		return paging;
//	}



//	public Paging<SaleVO> searchPage(SaleVO saleVO){
//		Paging<SaleVO> paging = new Paging<>(saleVO.getPage(), 10);
//		saleVO.setOffset(paging.getOffset());
//		saleVO.setLimit(paging.getSize());
//
//		paging.setRecords(search(saleVO));
//		paging.setTotalRecordCount(saleMapper.countSearch(saleVO));
//
//		return paging;
//	}
}
