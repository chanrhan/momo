package com.momo.api;

import com.momo.common.enums.codes.ErrorCode;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.SaleSearchVO;
import com.momo.common.vo.SaleVO;
import com.momo.common.vo.SearchVO;
import com.momo.exception.RestApiException;
import com.momo.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDate;
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

	/**
	 * 판매일보 검색
	 * @param vo SaleSearchVO
	 * @return {
	 *     판매일보 모든 컬럼
	 * }
	 */
	@PostMapping("")
	public ResponseEntity<List<Map<String,Object>>> getSale(@RequestBody SaleSearchVO vo){
		System.out.println("get sale: "+vo);
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		return ResponseEntity.ok(saleService.getSaleByUserId(vo));
	}

	/**
	 * 판매일보 카테고리 검색
	 * @param category string
	 * @return {
	 *
	 * }
	 */
	@PostMapping("/{category}")
	public ResponseEntity<List<Map<String,Object>>> getSale(@PathVariable String category,@RequestBody SaleSearchVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		if(category != null){
			List<Map<String,Object>> list = saleService.getSaleByCategory(category, vo);
			if(list == null){
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(list);
		}
//		throw new RestApiException();
		return ResponseEntity.badRequest().build();
	}

	/**
	 * 판매일보 다중 삭제
	 * @param deletes int[]
	 * @return Boolean
	 */
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

	/**
	 * 판매일보 추가
	 * @param vo
	 * @param spec
	 * @param docs
	 * @return
	 */
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
