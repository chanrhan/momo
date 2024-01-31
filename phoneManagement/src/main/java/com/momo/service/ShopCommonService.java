package com.momo.service;

import com.momo.mapper.ShopCommonMapper;
import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import com.momo.vo.UserCommonVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShopCommonService extends CommonService {
	private final UserCommonService userCommonService;
	private final ShopCommonMapper shopCommonMapper;

	// Shop
	public int insertShop(ShopCommonVO vo) {
		return shopCommonMapper.insertShop(vo);
	}

	public int updateShop(ShopCommonVO vo) {
		return shopCommonMapper.updateShop(getUpdateQueryString(vo));
	}

	public int deleteShop(int id) {
		return shopCommonMapper.deleteShop(id);
	}

	public List<Map<String,Object>> selectShop(ShopCommonVO vo) {
		return shopCommonMapper.selectShop(getSelectQueryString(vo));
	}
	public List<Map<String,Object>> searchShop(SearchVO vo) {
		return shopCommonMapper.searchShop(vo);
	}

	public int getMaxShopId(){
		Integer code = shopCommonMapper.getMaxShopId();
		if(code == null){
			return 0;
		}
		return code;
	}

	public List<Map<String,Object>> selectShopByUser(String id){
		Map<String,Object> emp = userCommonService.selectEmp(UserCommonVO.builder().id(id).build()).get(0);
		ShopCommonVO shopCommonVO = new ShopCommonVO();
		if(emp.get("role").equals("REPS")){
			shopCommonVO.setBNo(emp.get("b_no").toString());
		}else{
			shopCommonVO.setShopId(Integer.parseInt(emp.get("shop_id").toString()));
		}
		return selectShop(shopCommonVO);
	}

	// Corperation
	public int insertCorp(ShopCommonVO vo) {
		return shopCommonMapper.insertCorp(vo);
	}

	public int updateCorp(ShopCommonVO vo) {
		return shopCommonMapper.updateCorp(getUpdateQueryString(vo));
	}

	public int deleteCorp(String bNo) {
		return shopCommonMapper.deleteCorp(bNo);
	}

	public List<Map<String,Object>> selectCorp(ShopCommonVO vo) {
		return shopCommonMapper.selectCorp(getSelectQueryString(vo));
	}

	public List<Map<String,Object>> searchCorp(SearchVO vo) {
		return shopCommonMapper.searchCorp(vo);
	}

}
