package com.momo.controller;

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
    @GetMapping("")
    public ResponseEntity<Map<String,Object>> getAll(HttpSession session,
                                                        @RequestParam int type,
                                                        @RequestParam(required = false)String keyword,
                                                              @RequestParam(required = false)Integer provider){
        int currShopId = commonService.getCurrentShopId(session);
        GMDVO vo = GMDVO.builder().currShopId(currShopId).keyword(keyword).provider(provider).build();
        log.info("keyword: {}", vo.getKeyword());
        Map<String,Object> result = switch (type){
            case 0 -> gmdService.getDevice(vo);
            case 1 -> gmdService.getSecondDevice(vo);
            case 2 -> gmdService.getCtPlan(vo);
            //
            case 3 -> gmdService.getInternetPlan(vo);
            case 4 -> gmdService.getTvPlan(vo);
            case 5 -> gmdService.getExtraService(vo);
            case 6 -> gmdService.getSupportDiv(vo);
            case 7 -> gmdService.getAddDiv(vo);
            case 8 -> gmdService.getComb(vo);
            default -> null;
        };
        return ResponseEntity.ok(result);
    }


//    // 세컨 디바이스 by ID
//    @GetMapping("/sec-device/{id}")
//    public ResponseEntity<Map<String,Object>> getSecondDeviceById(@PathVariable int id){
//        return ResponseEntity.ok(gmdService.getSecondDeviceById(id));
//    }

    // insert
    @PostMapping("")
    public ResponseEntity<Boolean> insert(HttpSession session,
                                             @RequestParam int type,
                                             @RequestBody GMDVO vo){
        int currShopId  = commonService.getCurrentShopId(session);
        vo.setCurrShopId(currShopId);
        switch (type){
            case 0: gmdService.insertDevice(vo); break;
            case 1: gmdService.insertSecondDevice(vo);  break;
            case 2: gmdService.insertCtPlan(vo); break;
            //
            case 3: gmdService.insertInternetPlan(vo); break;
            case 4: gmdService.insertTvPlan(vo); break;
            case 5: gmdService.insertExtraService(vo); break;
            case 6: gmdService.insertSupportDiv(vo); break;
            case 7: gmdService.insertAddDiv(vo); break;
            case 8: gmdService.insertComb(vo); break;
            default: return ResponseEntity.badRequest().build();

        }
        return ResponseEntity.ok(true);
    }

    // Insert All
    @PostMapping("/all")
    public ResponseEntity<Boolean> insertAll(HttpSession session,
                                             @RequestParam int type,
                                             @RequestBody List<GMDVO> list){
        int currShopId  = commonService.getCurrentShopId(session);
        switch (type){
            case 0: gmdService.insertDeviceAll(list); break;
            case 1: gmdService.insertSecondDeviceAll(list);  break;
            case 2: gmdService.insertCtPlanAll(list); break;
            //
            case 3: gmdService.insertInternetPlanAll(currShopId, list); break;
            case 4: gmdService.insertTvPlanAll(currShopId, list); break;
            case 5: gmdService.insertExtraServiceAll(currShopId, list); break;
            case 6: gmdService.insertSupportDivAll(currShopId, list); break;
            case 7: gmdService.insertAddDivAll(currShopId, list); break;
            case 8: gmdService.insertCombAll(currShopId, list); break;
            default: return ResponseEntity.badRequest().build();

        }
        return ResponseEntity.ok(true);
    }


    // 수정
    @PostMapping("/update")
    public ResponseEntity<Boolean> updateItem(HttpSession session,
                                                   @RequestParam int type,
                                                   @RequestBody GMDVO vo){
        int currShopId = commonService.getCurrentShopId(session);
        vo.setCurrShopId(currShopId);
        int result = switch (type){
            case 0 -> gmdService.updateDevice(vo);
            case 1 -> gmdService.updateSecondDevice(vo);
            case 2 -> gmdService.updateCtPlan(vo);
            //
            case 3 -> gmdService.updateInternetPlan(vo);
            case 4 -> gmdService.updateTvPlan(vo);
            case 5 -> gmdService.updateExsvc(vo);
            case 6 -> gmdService.updateSupportDiv(vo);
            case 7 -> gmdService.updateAddDiv(vo);
            case 8 -> gmdService.updateCombTp(vo);
            default -> 0;
        };
        return ResponseEntity.ok(result > 0);
    }

    // 수정
    @PostMapping("/change-order")
    public ResponseEntity<Boolean> changeOrder(HttpSession session,
                                              @RequestParam int type,
                                              @RequestBody List<GMDVO> list){
        int currShopId = commonService.getCurrentShopId(session);
        int result = switch (type){
            case 0 -> gmdService.changeOrderDevice(currShopId, list);
            case 1 -> gmdService.changeOrderSecondDevice(currShopId, list);
            case 2 -> gmdService.changeOrderCtPlan(currShopId, list);
            //
            case 3 -> gmdService.changeOrderInternetPlan(currShopId, list);
            case 4 -> gmdService.changeOrderTvPlan(currShopId, list);
            case 5 -> gmdService.changeOrderExsvc(currShopId, list);
            case 6 -> gmdService.changeOrderSupportDiv(currShopId, list);
            case 7 -> gmdService.changeOrderAddDiv(currShopId, list);
            case 8 -> gmdService.changeOrderCombTp(currShopId, list);
            default -> 0;
        };
        return ResponseEntity.ok(result > 0);
    }

    // 삭제
    @PostMapping("/del")
    public ResponseEntity<Boolean> deleteAll(HttpSession session,
                                                   @RequestParam int type,
                                                   @RequestBody List<Integer> list){
        int currShopId = commonService.getCurrentShopId(session);
        int result = switch (type){
            case 0 -> gmdService.deleteDeviceAll(list);
            case 1 -> gmdService.deleteSecondDeviceAll(list);
            case 2 -> gmdService.deleteCtPlanAll(list);
            //
            case 3 -> gmdService.deleteInternetPlanAll(currShopId, list);
            case 4 -> gmdService.deleteTvPlanAll(currShopId, list);
            case 5 -> gmdService.deleteExsvcAll(currShopId, list);
            case 6 -> gmdService.deleteSupportDivAll(currShopId, list);
            case 7 -> gmdService.deleteAddDivAll(currShopId, list);
            case 8 -> gmdService.deleteCombTpAll(currShopId, list);
            default -> 0;
        };
        return ResponseEntity.ok(result > 0);
    }

    @GetMapping("/msg/template")
    public ResponseEntity<List<Map<String,Object>>> getMessageTemplate(){
        return ResponseEntity.ok(gmdService.getMessageTemplate());
    }

    @PostMapping("/msg/template/add")
    public ResponseEntity<Boolean> insertMessageTemplate(@RequestBody GMDVO vo){
        gmdService.insertMessageTemplate(vo);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/msg/template/update")
    public ResponseEntity<Boolean> updateMessageTemplate(@RequestBody GMDVO vo){
        return ResponseEntity.ok(gmdService.updateMessageTemplate(vo) > 0);
    }

    @GetMapping("/msg/template/del")
    public ResponseEntity<Boolean> deleteMessageTemplate(@RequestParam int msgId){
        return ResponseEntity.ok(gmdService.deleteMessageTemplate(msgId) > 0);
    }

}
