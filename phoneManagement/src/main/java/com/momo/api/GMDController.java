package com.momo.api;

import com.momo.service.GMDService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// 이하 GMDS (Global Master Data Set)
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/gmd")
public class GMDController {
    private final GMDService gmdService;

    @GetMapping("/device")
    public ResponseEntity<List<Map<String,Object>>> fetchDevices(@RequestParam(required = false)String keyword){
        return ResponseEntity.ok(gmdService.getDevice(keyword));
    }

    @GetMapping("/exsvc")
    public ResponseEntity<List<Map<String,Object>>> fetchExtraServices(@RequestParam(required = false)String keyword){
        return ResponseEntity.ok(gmdService.getExtraService(keyword));
    }

    @GetMapping("/phone")
    public ResponseEntity<Map<String,String>> getPhoneModel(){
        return ResponseEntity.ok(gmdService.getPhoneModel());
    }
}
