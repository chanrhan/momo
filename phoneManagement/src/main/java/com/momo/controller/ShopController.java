package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.service.RegionService;
import com.momo.service.ShopCommonService;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.vo.SearchVO;
import com.momo.common.vo.ShopCommonVO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/shop")
@PreAuthorize("isAuthenticated()")
public class ShopController {
	private final ShopCommonService shopCommonService;
	private final RegionService     regionService;

	@GetMapping("/home")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String shopHome(){
		return "shop/home";
	}

	@GetMapping("/branch")
	@RoleAuth(role = RoleAuth.Role.REPS)
	public String shopBranch(Model model){
		model.addAttribute("list_state", regionService.selectAllState());
		return "shop/shop_branch";
	}

	@PostMapping("/create")
	@ResponseBody
	public ResponseEntity<Boolean> createShop(@RequestBody ShopCommonVO vo){
		Map<String,Object> corp = shopCommonService.selectCorpByRepsId(vo.getRepsId());
		if(corp == null || corp.get("corp_id") == null){
			return ResponseEntity.badRequest().build();
		}
		vo.setCorpId(Integer.parseInt(corp.get("corp_id").toString()));
		vo.setShopId(shopCommonService.getMaxShopId()+1);

		// 대표가 매장을 추가할 때,
		// 해당 회사의 사업자번호를 따옴
		vo.setShopBpNo(corp.get("corp_bp_no").toString());

		return ResponseEntityUtil.okOrNotModified(shopCommonService.insertShop(vo));
	}

	@GetMapping("/detail")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String shopDetail(Model model, HttpSession session){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopBySession(session);
		Map<String,Object>       shop      = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);

		return "shop/shop_detail";
	}

	@GetMapping("/list/{id}")
	@ResponseBody
	public ResponseEntity<Map<String,Object>> selectShopById(@PathVariable int id){
		return ResponseEntityUtil.okOrNotFound(shopCommonService.selectShopById(id));
	}

	@GetMapping("/city")
	@ResponseBody
	public ResponseEntity<String[]> getCitiesByState(@RequestParam String state){
		String stateList = regionService.selectCityByState(state);
		if(stateList == null){
			return ResponseEntity.notFound().build();
		}
		return ResponseEntityUtil.okOrNotFound(stateList.split(","));
	}

	@PostMapping("/search/shop")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> searchShop(@RequestBody SearchVO vo){
		return ResponseEntityUtil.okOrNotFound(shopCommonService.searchShop(vo));
	}
}
