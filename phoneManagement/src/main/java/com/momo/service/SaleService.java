package com.momo.service;

import com.momo.mapper.SaleMapper;
import com.momo.util.SecurityContextUtil;
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

	private final UserCommonService userCommonService;
	private final ShopCommonService shopCommonService;

	public int countTel(SaleVO vo){
		return saleMapper.countTel(vo);
	}

	public List<Map<String,Object>> dupTelOnMonth(SaleVO vo){
		return saleMapper.dupTelOnMonth(vo);
	}

	// Common
	public int insertSale(SaleVO vo) {
		vo.setSaleId(getMaxSaleId()+1);
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
		if(vo.getOrder() == null){
			vo.setOrder("actv_dt");
		}
		if(vo.getAsc() == null){
			vo.setAsc("desc");
		}
		return saleMapper.selectSale(vo);
	}

	public List<Map<String,Object>> selectSaleByContext() {
		Map<String,Object> emp = userCommonService.selectEmpById(SecurityContextUtil.getUsername());
		SaleVO vo = new SaleVO();
		if(emp.get("role").equals("REPS")){
			vo.setBpNo(emp.get("bp_no").toString());
		}else{
			vo.setShopId(Integer.parseInt(emp.get("shop_id").toString()));
		}
		return selectSale(vo);
	}

	public List<Map<String,Object>> selectSaleByRole() {
		return selectSaleByRole(new SaleVO());
	}


	public List<Map<String,Object>> selectSaleByRole(SaleVO vo) {
		Integer shopId = vo.getShopId();
		if(shopId != null && shopId == 0){
			vo.setShopId(null);
			if(vo.getBpNo() == null){
				String bpNo = shopCommonService.getBpNoByShopId(shopId);
				vo.setBpNo(bpNo);
			}
		}
		return selectSale(vo);
	}

	// SELECT by shop_id
	public List<Map<String,Object>> selectSaleByShopId(Object id) {
		SaleVO vo = SaleVO.builder().shopId(Integer.parseInt(id.toString())).build();
		return selectSale(vo);
	}

	// SELECT by sale_id
	public Map<String,Object> selectSaleById(int id){
		SaleVO vo = SaleVO.builder().saleId(id).build();
		return saleMapper.selectSale(vo).get(0);
	}

	// 추후 각 관리 파트(중고폰/결합/지원/세컨/카드) 에 맞는 컬럼만 DB에서 뽑아올 수 있도록 수정해야 함
	// ex) 중고폰만 찾는 쿼리면 (개통날짜, 이름, 번호, 식별번호, 중고폰 모델명, 상태, 판매금액, 매니저 아이디) 만 select 하게
	public List<Map<String,Object>> selectSaleByType(String type){
		SaleVO vo = SaleVO.builder().target(type).build();
		return selectSaleByRole(vo);
	}

	public List<Map<String,Object>> searchSaleByType(String type, SearchVO vo){
		vo.setTarget(type);
		return searchSaleByRole(vo);
	}

	public int getMaxSaleId(){
		Integer result = saleMapper.getMaxId();
		if(result == null){
			return 0;
		}
		return result;
	}

	public List<Map<String,Object>> searchSale(SearchVO searchVO){
		return saleMapper.searchSale(searchVO);
	}

	public List<Map<String,Object>> searchSaleByRole(SearchVO vo){
		String shopId = vo.getSelect().get("shop_id").toString();
		if(shopId != null && shopId.equals("0")){
			vo.getSelect().remove("shop_id");
			if(vo.getSelect().get("bp_no") == null){
				String bpNo = shopCommonService.getBpNoByShopId(Integer.parseInt(shopId));
				vo.getSelect().put("bp_no", bpNo);
			}
		}

		return saleMapper.searchSale(vo);
	}
}
