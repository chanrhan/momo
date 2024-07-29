package com.momo.api;

import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.CommonVO;
import com.momo.common.vo.SaleSearchVO;
import com.momo.common.vo.SaleVO;
import com.momo.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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

	@GetMapping("/task/count/total")
	public ResponseEntity<Integer> getSaleTotalCountByCategory(@RequestParam Integer category){
		String username = SecurityContextUtil.getUsername();

		switch (category){
			case 0 -> {
				return ResponseEntity.ok(saleService.getSaleTotalUsedDeviceCount(username));
			}
			case 1 -> {
				return ResponseEntity.ok(saleService.getSaleTotalCardCount(username));
			}
			case 2 -> {
				return ResponseEntity.ok(saleService.getSaleTotalCombCount(username));
			}
			case 3 -> {
				return ResponseEntity.ok(saleService.getSaleTotalSupportCount(username));
			}
			case 4 -> {
				return ResponseEntity.ok(saleService.getSaleTotalPromiseCount(username));
			}
		}
		return ResponseEntity.badRequest().build();
	}

	/**
	 * 판매일보 카테고리 검색
//	 * @param category string
	 * @return {
	 *
	 * }
	 */
	@PostMapping("/category")
	public ResponseEntity<List<?>> getSale(@RequestBody SaleSearchVO vo){
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
				return ResponseEntity.ok(saleService.getPromise(vo));
			}
		}
		return ResponseEntity.badRequest().build();
	}

//	@PostMapping("/promise")
//	public ResponseEntity<List<Map<String,Object> >> getPromise(@RequestBody SaleSearchVO vo){
//		String username = SecurityContextUtil.getUsername();
//		vo.setUserId(username);
//		return ResponseEntity.ok(saleService.getPromise(vo));
//	}

//	@PostMapping("/promise")
//	public ResponseEntity<Boolean> updatePromise(@RequestBody SalePromiseVO vo){
//		String username = SecurityContextUtil.getUsername();
//		vo.setUserId(username);
//		return ResponseEntity.ok(saleService.changePromiseState(vo) > 0);
//	}

	/**
	 * 판매일보 다중 삭제
	 * @param deletes int[]
	 * @return Boolean
	 */
	@PostMapping("/delete")
	public ResponseEntity<?> deleteBulkSale(@RequestBody int[] deletes){
		log.info("delete: {}",deletes);
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(saleService.deleteBulkSale(username, deletes) != 0);
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
	@Transactional
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

	// 진행현황 관리

	@PostMapping("/state")
	@ResponseBody
	public ResponseEntity<Boolean> changeSaleState(@RequestBody Map<String , Integer> body){
		String username = SecurityContextUtil.getUsername();

		int category = body.get("category");
		int saleId = body.get("sale_id");

		int state = body.get("state");

		switch (category){
			case 0 -> {
				return ResponseEntity.ok(saleService.changeUsedDeviceState(username, saleId, body.get("item_id"), state) > 0);
			}
			case 1 -> {
				return ResponseEntity.ok(saleService.changeCardState(username, saleId,body.get("item_id"), state) > 0);
			}
			case 2 -> {
				return ResponseEntity.ok(saleService.changeCombState(username, saleId, state) > 0);
			}
			case 3 -> {
				return ResponseEntity.ok(saleService.changeSupportState(username, saleId, body.get("item_id"),state) > 0);
			}
			case 4 -> {
				return ResponseEntity.ok(saleService.changePromiseState(username, saleId, body.get("item_id"), state) > 0);
			}
		}
		return ResponseEntity.badRequest().build();
	}

	@GetMapping("/summary")
	public ResponseEntity<List<Map<String,Object>>> getSummary(@RequestParam String prevMonth,
																 @RequestParam String month){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(saleService.getSummary(username, prevMonth,month));
	}

	@GetMapping("/ratio")
	public ResponseEntity<List<Map<String,Object>>> getSaleRatio(@RequestParam String date){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(saleService.getSaleRatio(username, date));
	}

	@GetMapping("/wip")
	public ResponseEntity<List<Map<String,Object>>> getWorkInProcess(@RequestParam String date){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(saleService.getWorkInProcess(username, date));
	}

	@PostMapping("/change/ct")
	public ResponseEntity<Integer> getCtChangeAmount(@RequestBody CommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		return ResponseEntity.ok(saleService.getCtChangeAmount(vo));
	}

	@PostMapping("/change/internet")
	public ResponseEntity<Integer> getInternetChangeAmount(@RequestBody CommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		return ResponseEntity.ok(saleService.getInternetChangeAmount(vo));
	}

	@PostMapping("/change/tv")
	public ResponseEntity<Integer> getTvChangeAmount(@RequestBody CommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		return ResponseEntity.ok(saleService.getTvChangeAmount(vo));
	}

	@PostMapping("/change/total-cms")
	public ResponseEntity<Float> getTotalCmsChangeAmount(@RequestBody CommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		return ResponseEntity.ok(saleService.getTotalCmsChangeAmount(vo));
	}

	@PostMapping("/change/avg-cms")
	public ResponseEntity<Float> getAvgCmsChangeAmount(@RequestBody CommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		return ResponseEntity.ok(saleService.getAvgCmsChangeAmount(vo));
	}


	// 그래프 페이지
	// 그래프 요약
	@PostMapping("/graph/summary")
	public ResponseEntity<List<Map<String,Object>>> getGraphSummary(@RequestBody CommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		return ResponseEntity.ok(saleService.getGraphSummary(vo));
	}

	@PostMapping("/graph/ct/{dateType}")
	public ResponseEntity<Map<String,String> > getCtGraphByDateType(@PathVariable Character dateType,
														  @RequestBody CommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		vo.setDateType(dateType);
		return ResponseEntity.ok(saleService.getCtGraphByDateType(vo));
	}

	@PostMapping("/graph/internet/{dateType}")
	public ResponseEntity<Map<String,String> > getInternetGraphByDateType(@PathVariable Character dateType,
																	@RequestBody CommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		vo.setDateType(dateType);
		return ResponseEntity.ok(saleService.getInternetGraphByDateType(vo));
	}

	@PostMapping("/graph/tv/{dateType}")
	public ResponseEntity<Map<String,String> > getTvGraphByDateType(@PathVariable Character dateType,
																	@RequestBody CommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		vo.setDateType(dateType);
		return ResponseEntity.ok(saleService.getTvGraphByDateType(vo));
	}

	@PostMapping("/graph/margin/{dateType}")
	public ResponseEntity<Map<String,String> > getMarginGraphByDateType(@PathVariable Character dateType,
																	@RequestBody CommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		vo.setDateType(dateType);
		return ResponseEntity.ok(saleService.getMarginGraphByDateType(vo));
	}

	@PostMapping("/graph/avg-margin/date/{dateType}")
	public ResponseEntity<Map<String,String> > getAvgMarginGraphByDateType(@PathVariable Character dateType,
																	@RequestBody CommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		vo.setDateType(dateType);
		return ResponseEntity.ok(saleService.getAvgMarginGraphByDateType(vo));
	}

	@PostMapping("/graph/avg-margin/select/{selectType}")
	public ResponseEntity<List<Integer> > getAvgMarginBySelectType(@PathVariable Integer selectType,
																		   @RequestBody CommonVO vo){
		if (selectType == null) {
			return ResponseEntity.badRequest().build();
		}
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		vo.setSelectType(selectType);
		return ResponseEntity.ok(saleService.getAvgMarginBySelectType(vo));
	}
}
