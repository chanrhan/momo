package com.momo.controller;

import com.momo.service.*;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/sale")
@PreAuthorize("isAuthenticated()")
public class SaleController {
	private final EmployeeService employeeService;
	private final ShopService     shopService;
	private final SaleService     saleService;

	private final MsgFormService  msgFormService;
	private final PlanService     planService;
	private final ExtraSvcService extraSvcService;

	@GetMapping("")
	public String saleHome(Model model) {
		// 1. 현재 로그인된 유저의 아이디를 가져옴
		// 2. 유저가 속한 매장을 찾아 'selected_shop'에 할당
		// 3. 해당 매장과 같은 회사의 매장들을 'list_shop'에 할당
		// 4. 해당 매장의 모든 판매일보들을 'list_sale'에 할당

		String username = SecurityContextUtil.getUsername();

		Map<String,Object> empMap = employeeService.selectById(username);
		//		ShopVO shopVo;
		//		if(emp.getRole().equals("REPS")){
		//			shopVo = ShopVO.builder().bNo(emp.getBNo()).build();
		//		}else{
		//			shopVo = ShopVO.builder().shopCd(emp.getShopCd()).build();
		//		}
		List<Map<String,Object>> list_shop = shopService.selectByUser(empMap);
		Map<String,Object>       shop     = list_shop.get(0);


		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);

		Map<String,Object> selectMap = new HashMap<>();
		selectMap.put("shop_cd", shop.get("shop_cd"));
		selectMap.put("order", "actv_dt");

		List<Map<String,Object>> list_sale = saleService.search(SearchVO.builder().search(selectMap).build());
		model.addAttribute("list_sale", list_sale);

		return "sale/home";
	}

	@GetMapping("/detail/{no}")
	public String saleDetail(Model model, @PathVariable int no) {
		model.addAttribute("sale", saleService.selectById(no));
		return "sale/sale_detail";
	}

	@GetMapping("/create/form")
	public String saleCreateGET(Model model, @RequestParam int shopCd) {
		String username = SecurityContextUtil.getUsername();
		model.addAttribute("shopCode", shopCd);

		return "sale/sale_create";
	}

	@PostMapping("/update")
	@ResponseBody
	public boolean saleUpdate(@RequestBody Map<String,Object> map) {
		System.out.println(map);
		int result = saleService.update(map);

		return result != 0;
	}

	@PostMapping("/delete")
	@ResponseBody
	public boolean saleDelete(@RequestBody Map<String,Object> map) {
		return saleService.delete(map) != 0;
	}

	@PostMapping("/create")
	@ResponseBody
	public boolean saleCreatePOST(@RequestBody Map<String,Object> saleVO) {
		//		System.out.println(saleVO);
		//		List<MessageVO> list = saleVO.getMsgRsvList();
		//		saleVO.setRsvSt(!(list == null || list.isEmpty()));

		return saleService.insert(saleVO) != 0;
	}

	@GetMapping("/msg/rsv")
	public String msgReservation(Model model) {
		List<Map<String,Object>> defaultForm = msgFormService.getAllDefaultForm();
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
		model.addAttribute("list_plan", planService.selectAll());
		return "sale/plan_list";
	}

	@PostMapping("/plan/srch")
	@ResponseBody
	public List<Map<String,Object>> searchPlan(@RequestBody SearchVO searchVO) {
		return planService.search(searchVO);
	}

	@GetMapping("/exsvc/list")
	public String extraServiceList(Model model) {
		model.addAttribute("list_exsvc", extraSvcService.selectAll());
		return "sale/ex_svc_list";
	}

	@PostMapping("/exsvc/srch")
	@ResponseBody
	public List<Map<String,Object>> searchExtraService(@RequestBody SearchVO searchVO) {
		return extraSvcService.search(searchVO);
	}

	@PostMapping("/list/srch")
	@ResponseBody
	public List<Map<String,Object>> searchSale(@RequestBody SearchVO searchVO) {
		return saleService.search(searchVO);
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
