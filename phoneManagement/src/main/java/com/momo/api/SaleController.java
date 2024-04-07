package com.momo.api;

import com.momo.auth.RoleAuth;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.vo.SaleVO;
import com.momo.common.vo.SearchVO;
import com.momo.common.vo.ShopCommonVO;
import com.momo.common.vo.SupportVO;
import com.momo.service.*;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/sale")
public class SaleController {
	private final ShopCommonService shopCommonService;
	private final SaleService       saleService;

	private final MsgCommonService msgCommonService;
	private final ItemCommonService itemCommonService;

	private final ImageService imageService;

	@PostMapping("/list")
	public ResponseEntity<List<Map<String,Object>>> getSaleList(@RequestBody SaleVO vo){
		return ResponseEntity.ok(saleService.getSaleList(vo));
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
		}
		model.addAttribute("list_sup", list_sup);

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
	public ResponseEntity<Boolean> deleteSale(@PathVariable int id) {
		return ResponseEntityUtil.okOrNotModified(saleService.deleteSale(id));
	}

	@PostMapping("/create")
	@ResponseBody
	public ResponseEntity<Boolean> createSale(@RequestPart(value = "sale") SaleVO vo,
							  @RequestPart(value = "spec") MultipartFile file) {
		vo.setSpec(imageService.upload("spec", file));
		return ResponseEntityUtil.okOrNotModified(saleService.insertSale(vo));
	}

	@PostMapping("/update")
	@ResponseBody
	public ResponseEntity<Boolean> updateSale(@RequestPart(value = "sale") SaleVO vo,
							   @RequestPart(value = "spec") MultipartFile file) {
		vo.setSpec(imageService.upload("spec", file));
		return ResponseEntityUtil.okOrNotModified(saleService.updateSale(vo));
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
	public ResponseEntity<List<Map<String,Object>>> searchPlan(@RequestBody SearchVO searchVO) {
		return ResponseEntityUtil.okOrNotFound(itemCommonService.searchPlan(searchVO));
	}

	@GetMapping("/exsvc/list")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String extraServiceList(Model model) {
		model.addAttribute("list_exsvc", itemCommonService.selectExsvc(null));
		return "sale/ex_svc_list";
	}

	@PostMapping("/exsvc/srch")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> searchExsvc(@RequestBody SearchVO searchVO) {
		return ResponseEntityUtil.okOrNotFound(itemCommonService.searchExsvc(searchVO));
	}

	@PostMapping("/list/srch")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> searchSale(@RequestBody SearchVO searchVO, HttpSession session) {
//		System.out.println("qqq: "+searchVO);
		return ResponseEntityUtil.okOrNotFound(saleService.searchSaleBySession(searchVO, session));
	}

	@GetMapping("/msg/form/func")
	@ResponseBody
	public ResponseEntity<String> msgFormFunction(@RequestParam int formId) {
		return switch (formId) {
			case -2 -> ResponseEntity.ok("/sale/plan/list");
			case -3 -> ResponseEntity.ok("/sale/exsvc/list");
			default -> ResponseEntity.badRequest().build();
		};
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
	public ResponseEntity<List<Map<String,Object>>> searchSaleByType(@PathVariable String type, @RequestBody SearchVO vo, HttpSession session){
		String column = "";
		switch (type) {
			case "green" -> column = "green_md";
			case "second" -> column = "sec_md";
			case "support" -> column = "sup_div";
			case "comb" -> column = "comb_move";
			case "card" -> column = "card";
			default -> {
				return ResponseEntity.badRequest().build();
			}
		}
		return ResponseEntityUtil.okOrNotFound(saleService.searchSaleByTypeAndSession(column, vo, session));
	}

//	@PostMapping("/count/tel")
//	@ResponseBody
//	public int countTel(@RequestBody SaleVO vo){
//		Integer shopId = vo.getShopId();
//		String custTel = vo.getCustTel();
//		System.out.println(shopId+", "+custTel);
//		if(shopId == null || custTel == null){
//			return 0;
//		}
//
//		return saleService.countTel(vo);
//	}

	@PostMapping("/dup/tel")
	@ResponseBody
	public ResponseEntity<Boolean> checkDupTelOnDate(@RequestBody SaleVO vo){
//		if(vo.getShopId() == null || vo.getCustTel() == null || vo.getActvDt() ==null){
//			return null;
//		}
		return ResponseEntity.ok(saleService.isDuplicatedTel(vo));
	}
}
