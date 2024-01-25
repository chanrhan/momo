package com.momo.controller;

import com.momo.domain.Paging;
import com.momo.service.*;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/sale")
@PreAuthorize("isAuthenticated()")
public class SaleController {
	private final EmployeeService employeeService;
	private final ShopService     shopService;
	private final SaleService saleService;

	private final MessageService messageService;
	private final PlanService planService;
	private final ExtraSvcService extraSvcService;


	@GetMapping("")
	public String saleHome(Model model){
		// 1. 현재 로그인된 유저의 아이디를 가져옴
		// 2. 유저가 속한 매장을 찾아 'selected_shop'에 할당
		// 3. 해당 매장과 같은 회사의 매장들을 'list_shop'에 할당
		// 4. 해당 매장의 모든 판매일보들을 'list_sale'에 할당

		String username = SecurityContextUtil.getUsername();

		UserInfoVO emp = employeeService.selectById(username);
//		ShopVO shopVo;
//		if(emp.getRole().equals("REPS")){
//			shopVo = ShopVO.builder().bNo(emp.getBNo()).build();
//		}else{
//			shopVo = ShopVO.builder().shopCd(emp.getShopCd()).build();
//		}
		List<ShopVO> shopList = shopService.getShopByUser(emp);
		ShopVO shop = shopList.get(0);


		model.addAttribute("list_shop", shopList);
		model.addAttribute("selected_shop", shop);

		// 이거 나중에 Paging 으로 바꿀 것
		model.addAttribute("list_sale", saleService.select(SaleVO.builder()
				.shopCd(shop.getShopCd())
						.orderby("actv_dt")
						.side(true)
				.build()));

		return "sale/home";
	}

	@GetMapping("/detail/{no}")
	public String saleDetail(Model model, @PathVariable int no){
		model.addAttribute("sale",saleService.selectOne(SaleVO.builder().saleNo(no).build()));
		return "sale/sale_detail";
	}

	@GetMapping("/create/form")
	public String saleCreateGET(Model model, @RequestParam int shopCd){
		String username = SecurityContextUtil.getUsername();
		model.addAttribute("shopCode",shopCd);

		return "sale/sale_create";
	}

	@PostMapping("/update")
	@ResponseBody
	public boolean saleUpdate(@RequestBody SaleVO saleVO){
//		System.out.println(saleVO);
		int result = saleService.update(saleVO);

		return result != 0;
	}

	@GetMapping("/delete/{saleNo}")
	@ResponseBody
	public boolean saleDelete(@PathVariable int saleNo){
		return saleService.delete(SaleVO.builder().saleNo(saleNo).build()) != 0;
	}

	@PostMapping("/create")
	@ResponseBody
	public boolean saleCreatePOST(@RequestBody SaleVO saleVO){
		System.out.println(saleVO);
		List<MessageVO> list = saleVO.getMsgRsvList();
		saleVO.setSendSt(!(list == null || list.isEmpty()));

		int result = saleService.insert(saleVO);
		if(result == 0){
			return false;
		}

		if(list != null && !list.isEmpty()){
		    result = messageService.reserveMessage(list, saleVO.getMessageVO());
		}

		return result != 0;
	}

	@GetMapping("/msg/rsv")
	public String msgReservation(Model model){
		List<MessageVO> defaultForm = messageService.getAllDefaultForm();
		model.addAttribute("default_form", defaultForm);
		return "sale/msg_rsv";
	}

	@GetMapping("/graph")
	public String saleGraph(){
		return "sale/graph";
	}

	@GetMapping("/msg_form")
	public String msgForm(){
		return "sale/msg_form";
	}

	@GetMapping("/plan/list")
	public String planList(Model model){
		model.addAttribute("list_plan", planService.selectAll());
		return "sale/plan_list";
	}

	@PostMapping("/plan/srch")
	@ResponseBody
	public List<PlanVO> searchPlan(@RequestBody PlanVO planVO){
		return planService.search(planVO);
	}

	@GetMapping("/exsvc/list")
	public String extraServiceList(Model model){
		model.addAttribute("list_exsvc", extraSvcService.selectAll());
		return "sale/ex_svc_list";
	}

	@PostMapping("/exsvc/srch")
	@ResponseBody
	public List<ExtraServiceVO> searchExtraService(@RequestBody ExtraServiceVO extraServiceVO){
		return extraSvcService.search(extraServiceVO);
	}

	@PostMapping("/list/srch")
	@ResponseBody
	public List<SaleVO> searchSale(@RequestBody SaleVO saleVO){
		return saleService.search(saleVO);
	}

	@GetMapping("/msg/form/func")
	@ResponseBody
	public String msgFormFunction(@RequestParam int formId){
		switch (formId){
			case -1:
				return "/sale/plan/list";
			case -2:
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
