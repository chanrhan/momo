package com.momo.api;

import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.ShopCommonVO;
import com.momo.service.ShopCommonService;
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
	private final ShopCommonService shopCommonService;

	@PostMapping("/corp/search/role-detail")
	public ResponseEntity<List<Map<String,Object>>> searchCorpForRoleDetail(@RequestBody Map<String,String> map){
		return ResponseEntityUtil.okOrNotFound(shopCommonService.getCorpListForRoleDetail(map.get("keyword")));
	}

	@PostMapping("/shop/add")
	public ResponseEntity<?> addShop(@RequestBody ShopCommonVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
		log.info("shop info: {}",vo);
		return ResponseEntity.ok(shopCommonService.insertShop(vo) != 0);
	}

	@GetMapping("/shop/list")
	public ResponseEntity<List<Map<String,Object>>> getShopList(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(shopCommonService.getShopListByReps(username));
	}


}
