package com.momo.controller;

import com.momo.domain.user.UserDetailsImpl;
import com.momo.mapper.RoleDetailUserMapper;
import com.momo.service.RoleDetailUserService;
import com.momo.service.SaleService;
import com.momo.service.ShopService;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.SaleVO;
import com.momo.vo.ShopVO;
import com.momo.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/sale")
@PreAuthorize("hasAuthority('REPS') || hasAuthority('MANAGER')")
public class SaleController {
	private final RoleDetailUserService roleDetailUserService;
	private final ShopService shopService;
	private final SaleService saleService;

	@GetMapping("")
	public String saleHome(Model model){
		// 1. 현재 로그인된 유저의 아이디를 가져옴
		// 2. 유저가 속한 매장을 찾아 'selected_shop'에 할당
		// 3. 해당 매장과 같은 회사의 매장들을 'list_shop'에 할당
		// 4. 해당 매장의 모든 판매일보들을 'list_sale'에 할당

		String username = SecurityContextUtil.getUsername();
//		System.out.println("username: "+username);

		int shopCode = roleDetailUserService.selectById(username).getShopCd();
//		System.out.println("shopCode: "+shopCode);
		ShopVO shop = shopService.selectOne(ShopVO.builder().shopCd(shopCode).build());
//		System.out.println("shop: "+shop);

		model.addAttribute("list_shop", shopService.select(ShopVO.builder().bNo(shop.getBNo()).build()));
		model.addAttribute("selected_shop", shop.getShopNm());

		// 이거 나중에 Paging 으로 바꿀 것
		model.addAttribute("list_sale", saleService.getDetailByShopCode(SaleVO.builder().shopCd(shopCode).build()));

		return "sale/home";
	}

	@GetMapping("/detail/{no}")
	public String saleDetail(Model model, @PathVariable int no){
		model.addAttribute("sale",saleService.selectOne(SaleVO.builder().saleNo(no).build()));
		return "sale/sale_detail";
	}

	@GetMapping("/create")
	public String saleCreateGET(Model model){
		String username = SecurityContextUtil.getUsername();


		return "sale/sale_create";
	}

	@PostMapping("/create")
	public String saleCreatePOST(@RequestBody SaleVO saleVO){
		int result = saleService.insert(saleVO);
		if(result == 0){
			return "redirect:/sale/create";
		}

		return "sale/home";
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
}
