package com.momo.service;

import com.momo.mapper.ShopCommonMapper;
import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShopCommonService extends CommonService {
	private final UserCommonService userCommonService;
	private final ShopCommonMapper shopCommonMapper;

	public int updateSendTel(ShopCommonVO vo){
		return shopCommonMapper.updateShop(vo);
	}

	// Common
	// Shop
	public int insertShop(ShopCommonVO vo) {
		return shopCommonMapper.insertShop(vo);
	}

	public int updateShop(ShopCommonVO vo) {
		return shopCommonMapper.updateShop(vo);
	}

	public int deleteShop(int id) {
		return shopCommonMapper.deleteShop(id);
	}

	public List<Map<String,Object>> selectShop(ShopCommonVO vo) {
		return shopCommonMapper.selectShop(vo);
	}
	public List<Map<String,Object>> searchShop(SearchVO vo){
		if(vo.getSelect() != null && vo.getSelect().containsKey("bp_no")){
			String bpNo = vo.getSelect().get("bp_no").toString();
			vo.getSelect().put("shop_bp_no", bpNo);
			vo.getSelect().put("corp_bp_no",bpNo);
		}
		return shopCommonMapper.searchShop(vo);
	}

//	public List<Map<String,Object>> searchShopByRole(SearchVO vo) {
//		if(vo.getSelect() != null){
//			Integer shopId = Integer.parseInt(vo.getSelect().get("shop_id").toString());
//			if(shopId != null && shopId == 0){
//				vo.getSelect().remove("shop_id");
//				String bpNo = getBpNoByShopId(shopId);
//				vo.getSelect().put("bp_no", bpNo);
//			}
//		}
//
//		return shopCommonMapper.searchShop(vo);
//	}

	public int getMaxShopId(){
		Integer code = shopCommonMapper.getMaxShopId();
		if(code == null){
			return 0;
		}
		return code;
	}

	public List<Map<String,Object>> selectShopBySession(HttpSession session){
//		Map<String,Object> emp = userCommonService.selectEmpById(SecurityContextUtil.getUsername());
		ShopCommonVO vo = new ShopCommonVO();

		int shopId = Integer.parseInt(session.getAttribute("shop_id").toString());
		if(shopId == 0){
			int corpId = Integer.parseInt(session.getAttribute("corp_id").toString());
			vo.setCorpId(corpId);
		}else{
			vo.setShopId(shopId);
		}
		return selectShop(vo);
	}

	public Map<String,Object> selectShopById(int id){
		ShopCommonVO vo = ShopCommonVO.builder().shopId(id).build();
		return shopCommonMapper.selectShop(vo).get(0);
	}

	// Corperation
//	@Transactional
	public int insertCorp(ShopCommonVO vo) {
//		if(vo.getCorpId() == null || vo.getCorpId() == 0){
//			vo.setCorpId(getMaxCorpId()+1);
//		}
		Integer result = transactionTemplate.executeRepeatedly(status -> shopCommonMapper.insertCorp(vo));
		return (result != null) ? result : 0;
	}

	public int updateCorp(ShopCommonVO vo) {
		return shopCommonMapper.updateCorp(vo);
	}

	public int deleteCorp(String bNo) {
		return shopCommonMapper.deleteCorp(bNo);
	}

	public List<Map<String,Object>> selectCorp(ShopCommonVO vo) {
		return shopCommonMapper.selectCorp(vo);
	}

	public Map<String,Object> selectCorpById(int id) {
		ShopCommonVO vo = ShopCommonVO.builder().corpId(id).build();
		return shopCommonMapper.selectCorp(vo).get(0);
	}

	public Map<String,Object> selectCorpByRepsId(String id) {
		ShopCommonVO vo = ShopCommonVO.builder().repsId(id).build();
		return shopCommonMapper.selectCorp(vo).get(0);
	}

	public List<Map<String,Object>> searchCorp(SearchVO vo) {
		return shopCommonMapper.searchCorp(vo);
	}

	public int getMaxCorpId(){
		Integer id = shopCommonMapper.getMaxCorpId();
		return (id != null) ? id : 0;
	}

	public int getCorpPoint(int id){
		Integer pt = shopCommonMapper.getCorpPoint(id);
		return (pt != null) ? pt : 0;
	}

	// 최초 가입 시 지급 포인트
	public void giveFirstSignupPoint(){

	}

	public int updateCorpPoint(int corpId, int amount){
		if(amount == 0){
			return 0;
		}
		return shopCommonMapper.updateCorpPoint(corpId, amount);
	}

}
