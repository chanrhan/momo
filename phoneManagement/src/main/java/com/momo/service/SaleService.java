package com.momo.service;

import com.momo.mapper.SaleMapper;
import com.momo.vo.SaleVO;
import com.momo.vo.SearchVO;
import jakarta.servlet.http.HttpSession;
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

	public String getSpecFilePath(int id){
		return saleMapper.getSpecFilePath(id);
	}

	public int countTel(SaleVO vo){
		return saleMapper.countTel(vo);
	}

	public List<Map<String,Object>> dupTelOnMonth(SaleVO vo){
		return saleMapper.dupTelOnMonth(vo);
	}

	// Common
	public int insertSale(SaleVO vo) {
		vo.setSaleId(getMaxSaleId(vo.getShopId())+1);
		return saleMapper.insertSale(vo);
	}
	public int updateSale(SaleVO vo) {
		vo.setTarget("sale_id");
		return saleMapper.updateSale(vo);
	}
	public int deleteSale(int id) {
		return saleMapper.deleteSale(id);
	}

//	public List<Map<String,Object>> selectSale(SaleVO vo) {
//		if(vo.getOrder() == null){
//			vo.setOrder("actv_dt");
//		}
//		if(vo.getAsc() == null){
//			vo.setAsc("desc");
//		}
//		return saleMapper.selectSale(vo);
//	}

	public List<Map<String,Object>> selectSaleBySession(HttpSession session) {
//		Map<String,Object> emp = userCommonService.selectEmpById(SecurityContextUtil.getUsername());
		SaleVO vo = new SaleVO();

		int shopId = Integer.parseInt(session.getAttribute("shop_id").toString());
		if(shopId == 0){
			int corpId = Integer.parseInt(session.getAttribute("corp_id").toString());
			vo.setCorpId(corpId);
		}else{
			vo.setShopId(shopId);
		}
		return selectSale(vo);
	}

	public List<Map<String,Object>> selectSaleBySession(SaleVO vo, HttpSession session) {
		Integer shopId = vo.getShopId();
		if(shopId == null){
			vo.setShopId(Integer.parseInt(session.getAttribute("shop_id").toString()));
		}
		return selectSale(vo);
	}
	
	public List<Map<String,Object>> selectSale(SaleVO vo) {
		Integer shopId = vo.getShopId();

		if(shopId != null && shopId == 0){
			vo.setShopId(null);
			if(vo.getCorpId() == null || vo.getCorpId() == 0){
				int corpId = Integer.parseInt(shopCommonService.selectShopById(shopId).get("corp_id").toString());
				vo.setCorpId(corpId);
			}
		}
		if(vo.getOrder() == null){
			vo.setOrder("actv_dt");
		}
		if(vo.getAsc() == null){
			vo.setAsc("desc");
		}
		return saleMapper.selectSale(vo);
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
	// 완료
	public List<Map<String,Object>> selectSaleByTypeAndSession(String type, HttpSession session){
		SaleVO vo = SaleVO.builder().target(type).build();

		int shopId = Integer.parseInt(session.getAttribute("shop_id").toString());
		if(shopId == 0){
			int corpId = Integer.parseInt(session.getAttribute("corp_id").toString());
			vo.setCorpId(corpId);
		}else{
			vo.setShopId(shopId);
		}
		vo.setOrder("actv_dt");
		vo.setAsc("desc");
		return saleMapper.selectSale(vo);
	}

	public List<Map<String,Object>> searchSaleSession(SearchVO vo, HttpSession session){
		Object _shopId = vo.getSelect().get("shop_id");
		int shopId = 0;
		if(_shopId == null){
			shopId = Integer.parseInt(session.getAttribute("shop_id").toString());
		}else{
			shopId = Integer.parseInt(_shopId.toString());
		}

		if(shopId == 0){
			vo.getSelect().remove("shop_id");
			int corpId = Integer.parseInt(session.getAttribute("corp_id").toString());
			vo.getSelect().put("corp_id",corpId);
		}else{
			vo.getSelect().put("shop_id",shopId);
		}
		return searchSale(vo);
	}

	public List<Map<String,Object>> searchSaleByTypeAndSession(String type, SearchVO vo, HttpSession session){
		vo.setTarget(type);
		return searchSaleSession(vo, session);
	}

	public int getMaxSaleId(int shopId){
		Integer result = saleMapper.getMaxId(shopId);
		if(result == null){
			return 0;
		}
		return result;
	}

	public List<Map<String,Object>> searchSale(SearchVO vo){
//		if(vo.getSelect() != null) {
//			String shopId = vo.getSelect().get("shop_id").toString();
//			if (shopId != null && shopId.equals("0")) {
//				vo.getSelect().remove("shop_id");
//				if (!vo.getSelect().containsKey("corp_id")) {
//					System.out.println("corp corp");
//					String corpId = shopCommonService.selectShopById(Integer.parseInt(shopId)).get("corp_id").toString();
//					vo.getSelect().put("corp_id", Integer.parseInt(corpId));
//				}
//			}
//		}
//		System.out.println(vo.getSelect());


		return saleMapper.searchSale(vo);
	}
}
