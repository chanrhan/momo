package com.momo.api;

import com.momo.common.vo.GMDVO;
import com.momo.service.CommonService;
import com.momo.service.GMDService;
import jakarta.servlet.http.HttpSession;
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
    private final CommonService commonService;

    // 정적 목록

    // 핸드폰 기기
    @GetMapping("/device")
    public ResponseEntity<List<Map<String,Object>>> getDevice(@RequestParam(required = false)String keyword,
                                                              @RequestParam(required = false)Integer provider){
        return ResponseEntity.ok(gmdService.getDevice(keyword, provider));
    }



    // 세컨 디바이스
    @GetMapping("/sec-device")
    public ResponseEntity<List<Map<String,Object>>> getSecondDevice(@RequestParam(required = false)String keyword,
                                                                    @RequestParam(required = false)Integer provider){
        return ResponseEntity.ok(gmdService.getSecondDevice(keyword,provider));
    }

    // 세컨 디바이스 by ID
    @GetMapping("/sec-device/{id}")
    public ResponseEntity<Map<String,Object>> getSecondDeviceById(@PathVariable int id){
        return ResponseEntity.ok(gmdService.getSecondDeviceById(id));
    }

    // 무선 요금제
    @GetMapping("/ct-plan")
    public ResponseEntity<List<Map<String,Object>>> getCtPlan(@RequestParam(required = false)String keyword,
                                                              @RequestParam(required = false)Integer provider){
        return ResponseEntity.ok(gmdService.getCtPlan(keyword,provider));
    }

    // 동적 목록

    // 부가서비스
    @GetMapping("/exsvc")
    public ResponseEntity<List<Map<String,Object>>> getExtraService(HttpSession session,
                                                                    @RequestParam(required = false)String keyword,
                                                                    @RequestParam(required = false)Integer provider){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(gmdService.getExtraService(currShopId, keyword,provider));
    }

    // 인터넷 요금제
    @GetMapping("/internet-plan")
    public ResponseEntity<List<Map<String,Object>>> getInternetPlan(HttpSession session,
                                                                    @RequestParam(required = false)String keyword,
                                                                    @RequestParam(required = false)Integer provider){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(gmdService.getInternetPlan(currShopId, keyword,provider));
    }

    // TV 요금제
    @GetMapping("/tv-plan")
    public ResponseEntity<List<Map<String,Object>>> getTvPlan(HttpSession session,
                                                              @RequestParam(required = false)String keyword,
                                                              @RequestParam(required = false)Integer provider){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(gmdService.getTvPlan(currShopId, keyword,provider));
    }

    // 결합
    @GetMapping("/comb-tp")
    public ResponseEntity<List<Map<String,Object>>> getComb(HttpSession session,
                                                            @RequestParam(required = false)String keyword){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(gmdService.getComb(currShopId, keyword));
    }

    // 지원 구분
    @GetMapping("/sup-div")
    public ResponseEntity<List<Map<String,Object>>> getSupportDiv(HttpSession session,
                                                                  @RequestParam(required = false)String keyword){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(gmdService.getSupportDiv(currShopId, keyword));
    }

    // 지원 구분
    @GetMapping("/add-div")
    public ResponseEntity<List<Map<String,Object>>> getAddDiv(HttpSession session,
                                                              @RequestParam(required = false)String keyword){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(gmdService.getAddDiv(currShopId, keyword));
    }


    // 추가

    @PostMapping("/device")
    public ResponseEntity<Boolean> addDevice(@RequestBody List<GMDVO> list){
        gmdService.insertDeviceAll(list);
        return ResponseEntity.ok(true);
    }
    @PostMapping("/sec-device")
    public ResponseEntity<Boolean> addSecondDeviceAll(@RequestBody List<GMDVO> list){
        gmdService.insertSecondDeviceAll(list);
        return ResponseEntity.ok(true);
    }
    @PostMapping("/ct-plan")
    public ResponseEntity<Boolean> addCtPlanAll(@RequestBody List<GMDVO> list){
        gmdService.insertCtPlanAll(list);
        return ResponseEntity.ok(true);
    }
    @PostMapping("/internet-plan")
    public ResponseEntity<Boolean> addInternetPlanAll(HttpSession session,
                                                      @RequestBody List<GMDVO> list){
        log.info("internet plan: {}", list);
        int currShopId  = commonService.getCurrentShopId(session);
        gmdService.insertInternetPlanAll(currShopId, list);
        return ResponseEntity.ok(true);
    }
    @PostMapping("/tv-plan")
    public ResponseEntity<Boolean> addTvPlanAll(HttpSession session,
                                                @RequestBody List<GMDVO> list){
        int currShopId  = commonService.getCurrentShopId(session);
        gmdService.insertTvPlanAll(currShopId, list);

        return ResponseEntity.ok(true);
    }
    @PostMapping("/exsvc")
    public ResponseEntity<Boolean> addExsvcAll(HttpSession session,
                                               @RequestBody List<GMDVO> list){
        int currShopId  = commonService.getCurrentShopId(session);
        gmdService.insertExtraServiceAll(currShopId, list);
        return ResponseEntity.ok(true);
    }
    @PostMapping("/sup")
    public ResponseEntity<Boolean> addSupportDivAll(HttpSession session,
                                                    @RequestBody List<GMDVO> list){
        int currShopId  = commonService.getCurrentShopId(session);
        gmdService.insertSupportDivAll(currShopId, list);
        return ResponseEntity.ok(true);
    }
    @PostMapping("/add")
    public ResponseEntity<Boolean> addAddDivAll(HttpSession session,
                                                @RequestBody List<GMDVO> list){
        int currShopId  = commonService.getCurrentShopId(session);
        gmdService.insertAddDivAll(currShopId, list);
        return ResponseEntity.ok(true);
    }
    @PostMapping("/comb")
    public ResponseEntity<Boolean> addCombAll(HttpSession session,
                                              @RequestBody List<GMDVO> list){
        int currShopId  = commonService.getCurrentShopId(session);
        gmdService.insertCombAll(currShopId, list);
        return ResponseEntity.ok(true);
    }



}
