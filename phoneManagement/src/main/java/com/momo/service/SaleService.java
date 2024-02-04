package com.momo.service;

import com.momo.mapper.SaleMapper;
import com.momo.vo.SaleVO;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SaleService extends CommonService {
	private final SaleMapper saleMapper;

	public int insertSale(SaleVO vo) {
		vo.setSaleId(getMaxSaleNo()+1);
		return saleMapper.insertSale(vo);
	}
	public int updateSale(SaleVO vo) {
		vo.setTarget("sale_id");
		return saleMapper.updateSale(vo);
	}
	public int deleteSale(int id) {
		return saleMapper.deleteSale(id);
	}

	public List<Map<String,Object>> selectSale(SaleVO vo) {
		vo.setOrder("actv_dt");
		vo.setAsc("desc");
		return saleMapper.selectSale(vo);
	}

	public List<Map<String,Object>> selectSaleByShopId(Object id) {
		SaleVO vo = SaleVO.builder().shopId(Integer.parseInt(id.toString())).build();
		return selectSale(vo);
	}

	public Map<String,Object> selectSaleById(int id){
		SaleVO vo = SaleVO.builder().saleId(id).build();
		return selectSale(vo).get(0);
	}

	// 추후 각 관리 파트(중고폰/결합/지원/세컨/카드) 에 맞는 컬럼만 DB에서 뽑아올 수 있도록 수정해야 함
	// ex) 중고폰만 찾는 쿼리면 (개통날짜, 이름, 번호, 식별번호, 중고폰 모델명, 상태, 판매금액, 매니저 아이디) 만 select 하게
	public List<Map<String,Object>> selectSaleByType(String type){
		SaleVO vo = SaleVO.builder()
				.target(type)
				.order("actv_dt")
				.asc("desc").build();
		return saleMapper.selectSaleByType(vo);
	}

	public List<Map<String,Object>> selectSaleByType(String type, SaleVO vo){
		vo.setTarget(type);
		return saleMapper.selectSaleByType(vo);
	}

	public int getMaxSaleNo(){
		Integer result = saleMapper.getMaxId();
		if(result == null){
			return 0;
		}
		return result;
	}

	public List<Map<String,Object>> searchSale(SearchVO searchVO){
		return saleMapper.searchSale(searchVO);
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
