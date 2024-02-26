package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.service.RegionService;
import com.momo.service.ShopCommonService;
import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
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
//	@Transactional
	public boolean createShop(@RequestBody ShopCommonVO vo){
		Map<String,Object> corp = shopCommonService.selectCorpByRepsId(vo.getRepsId());

		if(corp == null || corp.get("corp_id") == null){
			return false;
		}
		vo.setCorpId(Integer.parseInt(corp.get("corp_id").toString()));
		vo.setShopId(shopCommonService.getMaxShopId()+1);

		return shopCommonService.insertShop(vo) != 0;
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
	public Map<String,Object> selectShopById(@PathVariable int id){
		return shopCommonService.selectShopById(id);
	}

	@GetMapping("/city")
	@ResponseBody
	public String[] getCitiesByState(@RequestParam String state){
		return regionService.selectByState(state).split(",");
	}

	@PostMapping("/search/shop")
	@ResponseBody
	public List<Map<String,Object>> searchShop(@RequestBody SearchVO vo){
		return shopCommonService.searchShop(vo);
	}
}
