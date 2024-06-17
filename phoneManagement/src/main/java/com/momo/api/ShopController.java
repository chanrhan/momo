package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.ShopVO;
import com.momo.service.ShopService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ShopController {
	private final ShopService shopService;

	@GetMapping("/corp")
	public ResponseEntity<List<Map<String,Object>>> getCorpListForRoleDetail(){
		String username = SecurityContextUtil.getUsername();
		ShopVO vo = ShopVO.builder().userId(username).build();
		return ResponseEntity.ok(shopService.getCorp(vo));
	}

	/**
	 * 매장 등록
	 * @param vo ShopVO
	 * @return Boolean
	 */
	@PostMapping("/shop")
	public ResponseEntity<?> addShop(@RequestBody ShopVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		log.info("shop info: {}",vo);
		return ResponseEntity.ok(shopService.insertShop(vo) != 0);
	}

	/**
	 *  매장 검색
	 * @param keyword string
	 * @return {
	 *     회사 식별번호
	 *     매장 식별번호
	 *     회사명
	 *     매장명
	 * }
	 */
	@GetMapping("/shop")
	public ResponseEntity<List<Map<String,Object>>> getShop(@RequestParam(required = false)String keyword){
		ShopVO vo = ShopVO.builder().keyword(keyword).build();
		return ResponseEntity.ok(shopService.getShop(vo));
	}

	/**
	 * 소속된 모든 매장 조회
	 * @return {
	 *     회사 식별번호
	 *     매장 식별번호
	 *     회사명
	 *     매장명
	 * }
	 */
	@GetMapping("/shop/all")
	public ResponseEntity<List<Map<String,Object>>> getShopAll(){
		String username = SecurityContextUtil.getUsername();
		ShopVO vo = ShopVO.builder().userId(username).build();
		return ResponseEntity.ok(shopService.getShop(vo));
	}

}
