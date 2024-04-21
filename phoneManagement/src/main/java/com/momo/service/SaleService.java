package com.momo.service;

import com.momo.common.util.SecurityContextUtil;
import com.momo.mapper.SaleMapper;
import com.momo.common.util.IntegerUtil;
import com.momo.common.vo.SaleVO;
import com.momo.common.vo.SearchVO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SaleService extends CommonService {
	private final SaleMapper        saleMapper;
	private final UserService       userService;
	private final ShopCommonService shopCommonService;

	public String getSpecFilePath(int id){
		return saleMapper.getSpecFilePath(id);
	}

	public boolean isDuplicatedTel(SaleVO vo){
		return saleMapper.isDuplicatedTel(vo);
	}

	// Common
	public int insertSale(SaleVO vo) {
//		vo.setSaleId(getMaxSaleId(vo.getShopId())+1);
		return saleMapper.insertSale(vo);
	}
	public int updateSale(SaleVO vo) {
//		vo.setTarget("sale_id");
		return saleMapper.updateSale(vo);
	}
	public int deleteSale(int id) {
		return saleMapper.deleteSale(id);
	}

	public List<Map<String,Object>> selectSaleBySession(HttpSession session) {
		SaleVO vo = new SaleVO();
		vo.setShopId(Integer.parseInt(session.getAttribute("shop_id").toString()));
		vo.setCorpId(Integer.parseInt(session.getAttribute("corp_id").toString()));

		return selectSale(vo);
	}

	public List<Map<String,Object>> getSaleList(SaleVO vo){
		String userId = SecurityContextUtil.getUsername();
		if(userId == null){
			return null;
		}
		vo.setUserId(userId);
//		System.out.println("get sale: "+vo);
		return saleMapper.getSaleList(vo);
	}

	public int deleteSales(int[] deletes){
		int result = 0;
		for(int saleId: deletes){
			result += saleMapper.deleteSale(saleId);
		}
		return result;
	}

	public List<Map<String,Object>> getSaleListWithCategory(String category, SaleVO vo){
		String userId = SecurityContextUtil.getUsername();
		vo.setUserId(userId);
		return switch (category) {
			case "card" -> saleMapper.getSaleListWithCard(vo);
			case "green" -> saleMapper.getSaleListWithGreenPhone(vo);
			case "comb" -> saleMapper.getSaleListWithComb(vo);
			case "support" -> saleMapper.getSaleListWithSupport(vo);
			default -> null;
		};
	}

	// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
	
	public List<Map<String,Object>> selectSale(SaleVO vo) {
		if(vo.getOrder() == null){
			vo.setOrder("actv_dt");
		}
//		if(vo.getAsc() == null){
//			vo.setAsc("desc");
//		}
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
		vo.setShopId(Integer.parseInt(session.getAttribute("shop_id").toString()));
		vo.setCorpId(Integer.parseInt(session.getAttribute("corp_id").toString()));

		return selectSale(vo);
	}

	public List<Map<String,Object>> searchSaleBySession(SearchVO vo, HttpSession session){
		if(vo.getSelect() == null){
			vo.setSelect(new HashMap<>());
		}

		if(!vo.getSelect().containsKey("shop_id")){
			vo.getSelect().put("shop_id", IntegerUtil.zeroToNull(session.getAttribute("shop_id")));
		}
		vo.getSelect().put("corp_id", session.getAttribute("corp_id"));
		return searchSale(vo);
	}

	public List<Map<String,Object>> searchSaleByTypeAndSession(String type, SearchVO vo, HttpSession session){
		vo.setTarget(type);
		return searchSaleBySession(vo, session);
	}

	public List<Map<String,Object>> searchSale(SearchVO vo){
		if(vo.getSelect() != null && vo.getSelect().containsKey("shop_id")) {
			String shopId = vo.getSelect().get("shop_id").toString();
			if (shopId != null && shopId.equals("0")) {
				vo.getSelect().remove("shop_id");
			}
		}


		return saleMapper.searchSale(vo);
	}
}
