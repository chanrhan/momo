package com.momo.service;

import com.momo.mapper.ShopCommonMapper;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
	public String getBpNoByShopId(int id){
		return shopCommonMapper.getBpNoByShopId(id);
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
	public List<Map<String,Object>> searchShopByRole(SearchVO vo) {
		Integer shopId = Integer.parseInt(vo.getSelect().get("shop_id").toString());
		if(shopId != null && shopId == 0){
			vo.getSelect().remove("shop_id");
			String bpNo = getBpNoByShopId(shopId);
			vo.getSelect().put("bp_no", bpNo);
		}
		return shopCommonMapper.searchShop(vo);
	}

	public int getMaxShopId(){
		Integer code = shopCommonMapper.getMaxShopId();
		if(code == null){
			return 0;
		}
		return code;
	}

	public List<Map<String,Object>> selectShopByContext(){
		Map<String,Object> emp = userCommonService.selectEmpById(SecurityContextUtil.getUsername());
		ShopCommonVO vo = new ShopCommonVO();
		if(emp.get("role").equals("REPS")){
			vo.setBpNo(emp.get("bp_no").toString());
		}else{
			vo.setShopId(Integer.parseInt(emp.get("shop_id").toString()));
		}
		return selectShop(vo);
	}

	public Map<String,Object> selectShopById(int id){
		ShopCommonVO vo = ShopCommonVO.builder().shopId(id).build();
		return shopCommonMapper.selectShop(vo).get(0);
	}

	// Corperation
	public int insertCorp(ShopCommonVO vo) {
		vo.setCorpId(getMaxCorpId()+1);
		return shopCommonMapper.insertCorp(vo);
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

	public List<Map<String,Object>> searchCorp(SearchVO vo) {
		return shopCommonMapper.searchCorp(vo);
	}

	public int getMaxCorpId(){
		Integer id = shopCommonMapper.getMaxCorpId();
		if(id == null){
			return 0;
		}
		return id;
	}

}
