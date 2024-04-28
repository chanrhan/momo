package com.momo.api;

import com.momo.common.util.ResponseEntityUtil;
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

	@GetMapping("/corp/search/role-detail")
	public ResponseEntity<List<Map<String,Object>>> getCorpListForRoleDetail(@RequestParam(required = false)String keyword,
																			 @RequestParam(required = false)String order,
																			 @RequestParam(required = false)boolean asc){
		String username = SecurityContextUtil.getUsername();
		ShopVO vo = ShopVO.builder().userId(username).keyword(keyword).order(order).asc(asc).build();
		return ResponseEntity.ok(shopService.getCorporation(vo));
	}

	@PostMapping("/shop")
	public ResponseEntity<?> addShop(@RequestBody ShopVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		log.info("shop info: {}",vo);
		return ResponseEntity.ok(shopService.insertShop(vo) != 0);
	}

	@GetMapping("/shop")
	public ResponseEntity<List<Map<String,Object>>> getShopList(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(shopService.getShop(ShopVO.builder().userId(username).build()));
	}


}
