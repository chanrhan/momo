package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
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


    // 정적 목록

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

    // 세컨 디바이스 by ID
    @GetMapping("/sec-device/{id}")
    public ResponseEntity<Map<String,Object>> getSecondDeviceById(@PathVariable int id){
        return ResponseEntity.ok(gmdService.getSecondDeviceById(id));
    }

    // 무선 요금제
    @GetMapping("/ct-plan")
    public ResponseEntity<List<Map<String,Object>>> getCtPlan(@RequestParam(required = false)String keyword){
        return ResponseEntity.ok(gmdService.getCtPlan(keyword));
    }

    // 동적 목록

    // 부가서비스
    @GetMapping("/exsvc")
    public ResponseEntity<List<Map<String,Object>>> getExtraService(@RequestParam(required = false)String keyword){
        String username = SecurityContextUtil.getUsername();
        return ResponseEntity.ok(gmdService.getExtraService(username, keyword));
    }

    // 인터넷 요금제
    @GetMapping("/internet-plan")
    public ResponseEntity<List<Map<String,Object>>> getInternetPlan(@RequestParam(required = false)String keyword){
        String username = SecurityContextUtil.getUsername();
        return ResponseEntity.ok(gmdService.getInternetPlan(username, keyword));
    }

    // TV 요금제
    @GetMapping("/tv-plan")
    public ResponseEntity<List<Map<String,Object>>> getTvPlan(@RequestParam(required = false)String keyword){
        String username = SecurityContextUtil.getUsername();
        return ResponseEntity.ok(gmdService.getTvPlan(username, keyword));
    }

    // 결합
    @GetMapping("/comb-tp")
    public ResponseEntity<List<Map<String,Object>>> getComb(@RequestParam(required = false)String keyword){
        String username = SecurityContextUtil.getUsername();
        return ResponseEntity.ok(gmdService.getComb(username, keyword));
    }

    // 지원 구분
    @GetMapping("/sup-div")
    public ResponseEntity<List<Map<String,Object>>> getSupportDiv(@RequestParam(required = false)String keyword){
        String username = SecurityContextUtil.getUsername();
        return ResponseEntity.ok(gmdService.getSupportDiv(username, keyword));
    }

    // 지원 구분
    @GetMapping("/add-div")
    public ResponseEntity<List<Map<String,Object>>> getAddDiv(@RequestParam(required = false)String keyword){
        String username = SecurityContextUtil.getUsername();
        return ResponseEntity.ok(gmdService.getAddDiv(username, keyword));
    }





}
