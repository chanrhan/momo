package com.momo.api;

import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.SaleVO;
import com.momo.common.vo.SearchVO;
import com.momo.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/sale")
public class SaleController {
	private final SaleService       saleService;

	private final ItemCommonService itemCommonService;

	private final ImageService imageService;

	@GetMapping("/{category}")
	public ResponseEntity<List<Map<String,Object>>> getSale(@PathVariable(required = false)String category,
															@RequestParam(required = false)String keyword,
															@RequestParam(required = false)String order,
															@RequestParam(required = false)boolean asc){
		String username = SecurityContextUtil.getUsername();
		SaleVO vo = SaleVO.builder().userId(username).keyword(keyword).order(order).asc(asc).build();
		if(category != null){
			List<Map<String,Object>> list = saleService.getSaleByCategory(category, vo);
			if(list == null){
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(list);
		}else{
			return ResponseEntity.ok(saleService.getSale(vo));
		}
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteSale(@RequestBody int[] deletes){
		log.info("delete: {}",deletes);
		return ResponseEntity.ok(saleService.deleteSales(deletes) != 0);
	}


	@GetMapping("/delete/{id}")
	@ResponseBody
	public ResponseEntity<Boolean> deleteSale(@PathVariable int id) {
		return ResponseEntityUtil.okOrNotModified(saleService.deleteSale(id));
	}

	@PostMapping("/add")
	@ResponseBody
	public ResponseEntity<Boolean> createSale(@RequestPart(value = "sale") SaleVO vo,
												@RequestPart(value = "spec", required = false) MultipartFile spec,
											  @RequestPart(value = "docs", required = false) MultipartFile docs) {
		if(spec != null){
			vo.setSpec(imageService.upload("sale/spec", spec));
		}

		if(docs != null){
			vo.setSaleDocs(imageService.upload("sale/docs", docs));
		}

		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		return ResponseEntity.ok(saleService.insertSale(vo) != 0);
	}

	@PostMapping("/update")
	@ResponseBody
	public ResponseEntity<Boolean> updateSale(@RequestPart(value = "sale") SaleVO vo,
							   @RequestPart(value = "spec") MultipartFile file) {
		vo.setSpec(imageService.upload("spec", file));
		return ResponseEntityUtil.okOrNotModified(saleService.updateSale(vo));
	}


	@PostMapping("/plan/srch")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> searchPlan(@RequestBody SearchVO searchVO) {
		return ResponseEntityUtil.okOrNotFound(itemCommonService.searchPlan(searchVO));
	}


	@PostMapping("/exsvc/srch")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> searchExsvc(@RequestBody SearchVO searchVO) {
		return ResponseEntityUtil.okOrNotFound(itemCommonService.searchExsvc(searchVO));
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

	@PostMapping("/dup/tel")
	@ResponseBody
	public ResponseEntity<Boolean> checkDupTelOnDate(@RequestBody SaleVO vo){
//		if(vo.getShopId() == null || vo.getCustTel() == null || vo.getActvDt() ==null){
//			return null;
//		}
		return ResponseEntity.ok(saleService.isDuplicatedTel(vo));
	}
}
