package com.momo.controller;

import com.momo.service.*;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/sale")
@PreAuthorize("isAuthenticated()")
public class SaleController {
	private final UserCommonService userCommonService;
	private final ShopCommonService shopCommonService;
	private final SaleService       saleService;

	private final MsgCommonService msgCommonService;
	private final ItemCommonService itemCommonService;

	@GetMapping("/home")
	public String saleHome(Model model) {
		// 1. 현재 로그인된 유저의 아이디를 가져옴
		// 2. 유저가 속한 매장을 찾아 'selected_shop'에 할당
		// 3. 해당 매장과 같은 회사의 매장들을 'list_shop'에 할당
		// 4. 해당 매장의 모든 판매일보들을 'list_sale'에 할당

		List<Map<String,Object>> list_shop = shopCommonService.selectShopByUser();
		Map<String,Object> shop = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}
		List<Map<String,Object>> list_sale = saleService.selectSaleByUser();

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);
		model.addAttribute("list_sale", list_sale);

		return "sale/home";
	}

	@GetMapping("/detail/{id}")
	public String saleDetail(Model model, @PathVariable int id) {
		Map<String,Object> map = saleService.selectSaleById(id);
		System.out.println(map);
		model.addAttribute("sale", map);
		Object sup_div = map.get("sup_div");
		Object sup_pay = map.get("sup_pay");
		List<SupportVO> list_sup = new ArrayList<>();
		if(sup_div != null && sup_pay != null){
			String[] d = sup_div.toString().split(",");
			String[] p = sup_pay.toString().split(",");
			for(int i=0;i<d.length;++i){
				list_sup.add(new SupportVO(d[i],p[i]));
			}
			System.out.println(list_sup);
		}
		model.addAttribute("list_sup", list_sup);
		return "sale/sale_detail";
	}

	@GetMapping("/create/form")
	public String saleCreateGET(Model model, @RequestParam int shopId) {
		String username = SecurityContextUtil.getUsername();
		Map<String,Object> shopMap = shopCommonService.selectShopById(shopId);

		model.addAttribute("shop_nm", shopMap.get("shop_nm").toString());
		model.addAttribute("shop_id", shopId);


		return "sale/sale_create";
	}

	@PostMapping("/update")
	@ResponseBody
	public boolean saleUpdate(@RequestBody SaleVO vo) {
		System.out.println(vo);
		return saleService.updateSale(vo) != 0;
	}

	@GetMapping("/delete/{id}")
	@ResponseBody
	public boolean saleDelete(@PathVariable int id) {
		return saleService.deleteSale(id) != 0;
	}

	@PostMapping("/create")
	@ResponseBody
	public boolean saleCreatePOST(@RequestBody SaleVO vo) {
		System.out.println(vo);
		return saleService.insertSale(vo) != 0;
	}

	@GetMapping("/msg/rsv")
	public String msgReservation(Model model) {
		List<Map<String,Object>> defaultForm = msgCommonService.getAllDefaultForm();
		model.addAttribute("default_form", defaultForm);
		return "sale/msg_rsv";
	}

	@GetMapping("/graph")
	public String saleGraph() {
		return "sale/graph";
	}

	@GetMapping("/msg_form")
	public String msgForm() {
		return "sale/msg_form";
	}

	@GetMapping("/plan/list")
	public String planList(Model model) {
		model.addAttribute("list_plan", itemCommonService.selectPlan(null));
		return "sale/plan_list";
	}

	@PostMapping("/plan/srch")
	@ResponseBody
	public List<Map<String,Object>> searchPlan(@RequestBody SearchVO searchVO) {
		return itemCommonService.searchPlan(searchVO);
	}

	@GetMapping("/exsvc/list")
	public String extraServiceList(Model model) {
		model.addAttribute("list_exsvc", itemCommonService.selectExsvc(null));
		return "sale/ex_svc_list";
	}

	@PostMapping("/exsvc/srch")
	@ResponseBody
	public List<Map<String,Object>> searchExsvc(@RequestBody SearchVO searchVO) {
		return itemCommonService.searchExsvc(searchVO);
	}

	@PostMapping("/list/srch")
	@ResponseBody
	public List<Map<String,Object>> searchSale(@RequestBody SearchVO searchVO) {
		return saleService.searchSaleByUser(searchVO);
	}

	@GetMapping("/msg/form/func")
	@ResponseBody
	public String msgFormFunction(@RequestParam int formId) {
		switch (formId) {
			case -2:
				return "/sale/plan/list";
			case -3:
				return "/sale/exsvc/list";
			default:
				return null;
		}
	}
	
	// 매장 관리

	@GetMapping("/green")
	public String saleGreenPhone(Model model){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopByUser();
		Map<String,Object> shop = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);
		model.addAttribute("list", saleService.selectSaleByType("green_md"));
		return "sale/green_phone";
	}
	@GetMapping("/card")
	public String saleCard(Model model){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopByUser();
		Map<String,Object> shop = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);
		model.addAttribute("list",saleService.selectSaleByType("card"));
		return "sale/card";
	}
	@GetMapping("/comb")
	public String saleComb(Model model){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopByUser();
		Map<String,Object> shop = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);
		model.addAttribute("list",saleService.selectSaleByType("comb_move"));
		return "sale/comb";
	}
	@GetMapping("/support")
	public String saleSupport(Model model){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopByUser();
		Map<String,Object> shop = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);
		model.addAttribute("list",saleService.selectSaleByType("sup_div1"));
		return "sale/support";
	}
	@GetMapping("/second")
	public String saleSecondPhone(Model model){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopByUser();
		Map<String,Object> shop = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);
		model.addAttribute("list",saleService.selectSaleByType("sec_md"));
		return "sale/second";
	}

	@PostMapping("/list/srch/{type}")
	@ResponseBody
	public List<Map<String,Object>> searchSaleByType(@PathVariable String type, @RequestBody SearchVO vo){
		String column = "";
		switch (type){
			case "green":
				column = "green_md";
				break;
			case "second":
				column = "sec_md";
				break;
			case "support":
				column = "sup_div1";
				break;
			case "comb":
				column = "comb_move";
				break;
			case "card":
				column = "card";
				break;
			default:
				return null;
		}
		return saleService.searchSaleByType(column, vo);
	}
}
