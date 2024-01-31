package com.momo.controller;

import com.momo.service.*;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

	@GetMapping("")
	public String saleHome(Model model) {
		// 1. 현재 로그인된 유저의 아이디를 가져옴
		// 2. 유저가 속한 매장을 찾아 'selected_shop'에 할당
		// 3. 해당 매장과 같은 회사의 매장들을 'list_shop'에 할당
		// 4. 해당 매장의 모든 판매일보들을 'list_sale'에 할당

		String username = SecurityContextUtil.getUsername();
		List<Map<String,Object>> list_shop = shopCommonService.selectShopByUser(username);
		Map<String,Object> shop = list_shop.get(0);
		List<Map<String,Object>> list_sale = saleService.selectSaleByShopId(shop.get("shop_id"));

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);
		model.addAttribute("list_sale", list_sale);

		return "sale/home";
	}

	@GetMapping("/detail/{id}")
	public String saleDetail(Model model, @PathVariable int id) {
		model.addAttribute("sale", saleService.selectSaleById(id));
		return "sale/sale_detail";
	}

	@GetMapping("/create/form")
	public String saleCreateGET(Model model, @RequestParam int shopId) {
		String username = SecurityContextUtil.getUsername();
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
		model.addAttribute("list_plan", itemCommonService.searchPlan(null));
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
		return saleService.searchSale(searchVO);
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


	//	@GetMapping("/list/filter")
	//	@ResponseBody
	//	public List<SaleVO> filterProvider(@RequestParam String provider){
	//		return saleService.select(SaleVO.builder().provider(provider).build());
	//	}

	//	@GetMapping("/list")
	//	@ResponseBody
	//	public Paging<SaleVO> getSaleListByShopCode(@RequestParam int shopCode){
	//		return saleService.selectPage(1, SaleVO.builder().shopCd(shopCode).build());
	//	}
}
