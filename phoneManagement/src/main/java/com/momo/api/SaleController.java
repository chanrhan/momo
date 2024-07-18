package com.momo.api;

import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.SaleSearchVO;
import com.momo.common.vo.SaleVO;
import com.momo.common.vo.SearchVO;
import com.momo.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/sale")
public class SaleController {
	private final SaleService       saleService;
	private final ReserveMsgService reserveMsgService;

	private final ItemCommonService itemCommonService;

	private final ImageService imageService;

	/**
	 * 판매일보 검색
	 * @param vo SaleSearchVO
	 * @return {
	 *     판매일보 모든 컬럼
	 * }
	 */
	@PostMapping("/all")
	public ResponseEntity<List<Map<String,Object>>> getSaleAll(@RequestBody(required = false) SaleSearchVO vo){
//		System.out.println("get sale: "+vo);
		if(vo == null){
			vo = new SaleSearchVO();
		}
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		return ResponseEntity.ok(saleService.getSaleAll(vo));
	}

	@GetMapping("/detail/{saleId}")
	public ResponseEntity<Map<String,Object>> getSale(@PathVariable int saleId){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(saleService.getSaleOne(username, saleId));
	}

	@GetMapping("/count/total")
	public ResponseEntity<Integer> getSaleTotalCount(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(saleService.getSaleTotalCount(username));
	}

	/**
	 * 판매일보 카테고리 검색
	 * @param category string
	 * @return {
	 *
	 * }
	 */
	@PostMapping("/category")
	public ResponseEntity<List<Map<String,Object>>> getSale(@RequestBody SaleSearchVO vo){
		int category = vo.getCategory();
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);


		switch (category){
			case 0 -> {
				return ResponseEntity.ok(saleService.getSaleAsUsedDevice(vo));
			}
			case 1 -> {
				return ResponseEntity.ok(saleService.getSaleAsCard(vo));
			}
			case 2 -> {
				return ResponseEntity.ok(saleService.getSaleAsComb(vo));
			}
			case 3 -> {
				return ResponseEntity.ok(saleService.getSaleAsSupport(vo));
			}
			case 4 -> {
				return ResponseEntity.ok(saleService.getAppointment(vo));
			}
		}
		return ResponseEntity.badRequest().build();
	}

	/**
	 * 판매일보 다중 삭제
	 * @param deletes int[]
	 * @return Boolean
	 */
	@PostMapping("/delete")
	public ResponseEntity<?> deleteSale(@RequestBody int[] deletes){
		log.info("delete: {}",deletes);
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(saleService.deleteSales(username, deletes) != 0);
	}


	@GetMapping("/delete/{id}")
	@ResponseBody
	public ResponseEntity<Boolean> deleteSale(@PathVariable int id) {
		String username = SecurityContextUtil.getUsername();
		return ResponseEntityUtil.okOrNotModified(saleService.deleteSale(username, id));
	}

	/**
	 * 판매일보 추가
	 * @param vo
	 * @param estimate
	 * @param docs
	 * @return
	 */
	@PostMapping("/add")
	@ResponseBody
	public ResponseEntity<Boolean> createSale(@RequestPart(value = "sale") SaleVO vo,
												@RequestPart(value = "estimate", required = false) MultipartFile estimate,
											  @RequestPart(value = "docs", required = false) MultipartFile docs) {
		log.info("sale add vo: {}", vo);
		log.info("sale add estimate: {}", estimate);
		log.info("sale add docs: {}", docs);
		if(estimate != null){
			vo.setEstimate(imageService.upload("sale/spec", estimate));
		}

		if(docs != null){
			vo.setDocs(imageService.upload("sale/docs", docs));
		}

		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);

		int maxSaleId = saleService.insertSale(vo);
		reserveMsgService.insertMsgList(username, maxSaleId, vo.getRsvMsgList());
		return ResponseEntity.ok(true);
	}


	@PostMapping("/update")
	@ResponseBody
	public ResponseEntity<Boolean> updateSale(@RequestPart(value = "sale") SaleVO vo,
							   				  @RequestPart(value = "estimate",required = false) MultipartFile estimate,
											  @RequestPart(value = "docs",required = false) MultipartFile docs) {
		log.info("update sale vo: {}", vo);
		if(estimate != null){
			vo.setEstimate(imageService.upload("sale/spec", estimate));
		}

		if(docs != null){
			vo.setDocs(imageService.upload("sale/docs", docs));
		}

		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);

		return ResponseEntity.ok(saleService.updateSale(vo) > 0);
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
