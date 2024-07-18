package com.momo.api;

import com.momo.service.GMDService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    // 핸드폰 기기
    @GetMapping("/device")
    public ResponseEntity<List<Map<String,Object>>> getDevice(@RequestParam(required = false)String keyword){
        return ResponseEntity.ok(gmdService.getDevice(keyword));
    }

    // 세컨 디바이스
    @GetMapping("/sec-device")
    public ResponseEntity<List<Map<String,Object>>> getSecondDevice(@RequestParam(required = false)String keyword){
        return ResponseEntity.ok(gmdService.getSecondDevice(keyword));
    }

    // 부가서비스
    @GetMapping("/exsvc")
    public ResponseEntity<List<Map<String,Object>>> getExtraService(@RequestParam(required = false)String keyword){
        return ResponseEntity.ok(gmdService.getExtraService(keyword));
    }

    // 인터넷 요금제
    @GetMapping("/internet-plan")
    public ResponseEntity<List<Map<String,Object>>> getInternetPlan(@RequestParam(required = false)String keyword){
        return ResponseEntity.ok(gmdService.getInternetPlan(keyword));
    }

    // TV 요금제
    @GetMapping("/tv-plan")
    public ResponseEntity<List<Map<String,Object>>> getTvPlan(@RequestParam(required = false)String keyword){
        return ResponseEntity.ok(gmdService.getTvPlan(keyword));
    }

    // 무선 요금제
    @GetMapping("/ct-plan")
    public ResponseEntity<List<Map<String,Object>>> getCtPlan(@RequestParam(required = false)String keyword){
        return ResponseEntity.ok(gmdService.getCtPlan(keyword));
    }



}
