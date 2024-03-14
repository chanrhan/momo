package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.service.*;
import com.momo.vo.*;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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

	private final ImageService imageService;

	@GetMapping("/home")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String saleHome(HttpSession session, Model model) {
		// 1. 현재 로그인된 유저의 아이디를 가져옴
		// 2. 유저가 속한 매장을 찾아 'selected_shop'에 할당
		// 3. 해당 매장과 같은 회사의 매장들을 'list_shop'에 할당
		// 4. 해당 매장의 모든 판매일보들을 'list_sale'에 할당

		List<Map<String,Object>> list_shop = shopCommonService.selectShopBySession(session);
		model.addAttribute("list_shop", list_shop);

		List<Map<String,Object>> list_sale = null;
		Map<String,Object> shop = null;
		if(list_shop != null && !list_shop.isEmpty()){
			shop = list_shop.get(0);
			list_sale = saleService.selectSaleBySession(session);
		}

		model.addAttribute("selected_shop", shop);
		model.addAttribute("list_sale", list_sale);

		return "sale/home";
	}

	@GetMapping("/detail")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String saleDetail(Model model,
							 @RequestParam int shopId,
							 @RequestParam int saleId) throws Exception {
		Map<String,Object> map = saleService.selectSale(SaleVO.builder()
																.shopId(shopId)
																.saleId(saleId)
																.build()).get(0);
//		System.out.println(map);
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
//			System.out.println(list_sup);
		}
		model.addAttribute("list_sup", list_sup);

//		Object         filePath = map.get("spec");
//		Object byteArray = null;
//		if(filePath != null && !"".equals(filePath)){
//			byteArray = imageService.download(filePath.toString()).getBody();
//		}
//		model.addAttribute("spec", byteArray);
		return "sale/sale_detail";
	}

	@GetMapping("/create/form")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String saleCreateForm(Model model, @RequestParam int shopId, HttpSession session) {
		ShopCommonVO vo = ShopCommonVO.builder()
				.corpId(Integer.parseInt(session.getAttribute("corp_id").toString()))
				.shopId(shopId).build();

		String shopName = null;
		try{
			Map<String,Object> shopMap = shopCommonService.selectShop(vo).get(0);
			shopName = shopMap.get("shop_nm").toString();
			shopId = Integer.parseInt(shopMap.get("shop_id").toString());
		}catch (NullPointerException e){
			e.printStackTrace();
			shopName = "[!] 데이터 오류가 발생했습니다.";
		}

		model.addAttribute("shop_nm", shopName);
		model.addAttribute("shop_id", shopId);

		return "sale/sale_create";
	}

	@GetMapping("/delete/{id}")
	@ResponseBody
	public boolean deleteSale(@PathVariable int id) {
		return saleService.deleteSale(id) != 0;
	}

	@PostMapping("/create")
	@ResponseBody
	public boolean createSale(@RequestPart(value = "sale") SaleVO vo,
								  @RequestPart(value = "spec") MultipartFile file) {
//		System.out.println("create vo: "+vo);
//		System.out.println("create files: "+file);
		String path = imageService.upload(file);
		vo.setSpec(path);
		return saleService.insertSale(vo) != 0;
	}

	@PostMapping("/update")
	@ResponseBody
	public boolean updateSale(@RequestPart(value = "sale") SaleVO vo,
							  @RequestPart(value = "spec") MultipartFile file) {
//		System.out.println(vo);
		String path = imageService.upload(file);
		vo.setSpec(path);
		return saleService.updateSale(vo) != 0;
	}

	@GetMapping("/msg/rsv")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String msgReservation(Model model) {
		List<Map<String,Object>> defaultForm = msgCommonService.getAllDefaultForm();
		model.addAttribute("default_form", defaultForm);
		return "sale/msg_rsv";
	}

	@GetMapping("/graph")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String saleGraph() {
		return "sale/graph";
	}

	@GetMapping("/plan/list")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
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
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
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
	public List<Map<String,Object>> searchSale(@RequestBody SearchVO searchVO, HttpSession session) {
		System.out.println("qqq: "+searchVO);
		return saleService.searchSaleBySession(searchVO, session);
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
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String saleGreenPhone(Model model, HttpSession session){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopBySession(session);
		Map<String,Object> shop = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);

		model.addAttribute("list", saleService.selectSaleByTypeAndSession("green_md", session));
		return "sale/green_phone";
	}
	@GetMapping("/card")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String saleCard(Model model, HttpSession session){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopBySession(session);
		Map<String,Object> shop = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);

		model.addAttribute("list",saleService.selectSaleByTypeAndSession("card", session));
		return "sale/card";
	}
	@GetMapping("/comb")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String saleComb(Model model, HttpSession session){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopBySession(session);
		Map<String,Object> shop = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);

		model.addAttribute("list",saleService.selectSaleByTypeAndSession("comb_move", session));
		return "sale/comb";
	}
	@GetMapping("/support")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String saleSupport(Model model, HttpSession session){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopBySession(session);
		Map<String,Object> shop = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);

		model.addAttribute("list",saleService.selectSaleByTypeAndSession("sup_div", session));
		return "sale/support";
	}

	@GetMapping("/second")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String saleSecondPhone(Model model, HttpSession session){
		List<Map<String,Object>> list_shop = shopCommonService.selectShopBySession(session);
		Map<String,Object> shop = null;
		if(!list_shop.isEmpty()){
			shop = list_shop.get(0);
		}

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);

		model.addAttribute("list",saleService.selectSaleByTypeAndSession("sec_md", session));
		return "sale/second";
	}

	@PostMapping("/list/srch/{type}")
	@ResponseBody
	public List<Map<String,Object>> searchSaleByType(@PathVariable String type, @RequestBody SearchVO vo, HttpSession session){
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
		return saleService.searchSaleByTypeAndSession(column, vo, session);
	}

	@PostMapping("/count/tel")
	@ResponseBody
	public int countTel(@RequestBody SaleVO vo){
		Integer shopId = vo.getShopId();
		String custTel = vo.getCustTel();
		System.out.println(shopId+", "+custTel);
		if(shopId == null || custTel == null){
			return 0;
		}

		return saleService.countTel(vo);
	}

	@PostMapping("/dup/tel")
	@ResponseBody
	public List<Map<String,Object>> checkDupTelOnDate(@RequestBody SaleVO vo){
		if(vo.getShopId() == null || vo.getCustTel() == null || vo.getActvDt() ==null){
			return null;
		}

		return saleService.dupTelOnMonth(vo);
	}
}
