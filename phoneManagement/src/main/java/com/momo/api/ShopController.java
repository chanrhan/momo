package com.momo.api;

import com.momo.common.util.ResponseEntityUtil;
import com.momo.service.ShopCommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
