package com.momo.controller;

import com.momo.service.RegionService;
import com.momo.service.ShopCommonService;
import com.momo.vo.ShopCommonVO;
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
	public String shopHome(){
		return "shop/home";
	}

	@GetMapping("/branch")
	public String shopBranch(Model model){
		model.addAttribute("list_state", regionService.selectAllState());
		return "shop/shop_branch";
	}

	@PostMapping("/create")
	@ResponseBody
	public boolean createShop(@RequestBody ShopCommonVO vo){
		Map<String,Object> corp = shopCommonService.selectCorpByUser(vo.getRepsId());

		vo.setBpNo(corp.get("bp_no").toString());
		vo.setShopId(shopCommonService.getMaxShopId()+1);

		return shopCommonService.insertShop(vo) != 0;
	}

	@GetMapping("/detail")
	public String shopDetail(Model model){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopByUser();
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
}
