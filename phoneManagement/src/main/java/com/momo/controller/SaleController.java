package com.momo.controller;

import com.momo.domain.Paging;
import com.momo.service.EmployeeService;
import com.momo.service.SaleService;
import com.momo.service.ShopService;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.SaleVO;
import com.momo.vo.ShopVO;
import com.momo.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/sale")
//@PreAuthorize("isAuthenticated()")
public class SaleController {
	private final EmployeeService employeeService;
	private final ShopService     shopService;
	private final SaleService saleService;

	@GetMapping("")
	public String saleHome(Model model){
		// 1. 현재 로그인된 유저의 아이디를 가져옴
		// 2. 유저가 속한 매장을 찾아 'selected_shop'에 할당
		// 3. 해당 매장과 같은 회사의 매장들을 'list_shop'에 할당
		// 4. 해당 매장의 모든 판매일보들을 'list_sale'에 할당

		String username = SecurityContextUtil.getUsername();
//		System.out.println("username: "+username);

		UserInfoVO emp = employeeService.selectById(username);
		ShopVO shopVo;
		if(emp.getRole().equals("REPS")){
			shopVo = ShopVO.builder().bNo(emp.getBNo()).build();
		}else{
			shopVo = ShopVO.builder().shopCd(emp.getShopCd()).build();
		}
		ShopVO shop = shopService.selectOne(shopVo);
		List<ShopVO> shopList = shopService.select(shopVo);

		model.addAttribute("list_shop", shopList);
		model.addAttribute("selected_shop", shop);

		// 이거 나중에 Paging 으로 바꿀 것
		model.addAttribute("list_sale", saleService.selectPage(1, SaleVO.builder().shopCd(shop.getShopCd()).build()));

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

	@PostMapping("/create")
	@ResponseBody
	public boolean saleCreatePOST(@RequestBody SaleVO saleVO){
		System.out.println(saleVO);
		int result = saleService.insert(saleVO);

		return result != 0;
	}

	@GetMapping("/msg_rsv")
	public String msgReservation(){
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

	@GetMapping("/list/filter")
	@ResponseBody
	public Paging<SaleVO> filterProvider(@RequestParam int page,
									  	 @RequestParam String provider){
		return saleService.selectPage(page, SaleVO.builder().provider(provider).build());
	}

	@PostMapping("/list/srch")
	@ResponseBody
	public Paging<SaleVO> searchSale(@RequestBody SaleVO saleVO){
		System.out.println(saleVO.toStringSuper());
		Paging<SaleVO> s = saleService.searchPage(saleVO);
		System.out.println(s);
		return s;
	}

	@GetMapping("/list")
	@ResponseBody
	public Paging<SaleVO> getSaleListByShopCode(@RequestParam int shopCode){
		return saleService.selectPage(1, SaleVO.builder().shopCd(shopCode).build());
	}
}
