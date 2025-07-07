package com.momo.api;

import com.momo.common.vo.VisitedShopVO;
import com.momo.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/visited-shop")
    public ResponseEntity<Boolean> insertVisitedShop(@RequestBody VisitedShopVO vo){
        adminService.insertVisitedShop(vo);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/visited-shop/list")
    public ResponseEntity<List<Map<String,Object>>> getVisitedShopList(@RequestBody VisitedShopVO vo){
        return ResponseEntity.ok(adminService.getVisitedShopList(vo));
    }
}
