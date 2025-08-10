package com.momo.controller;

import com.momo.common.vo.ReserveMessageVO;
import com.momo.common.vo.SaleVO;
import com.momo.service.CommonService;
import com.momo.service.ReserveMsgService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/msg")
public class ReserveMsgController {
    private final ReserveMsgService reserveMsgService;
    private final CommonService commonService;

    @GetMapping("/calendar")
    public ResponseEntity<List<String>> getReserveMsgForCalendar(HttpSession session,
                                                                              @RequestParam String date){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(reserveMsgService.getReserveMsgForCalendar(currShopId, date));
    }

    @GetMapping("/sale")
    public ResponseEntity<List<Map<String,Object>>> getReserveMsgBySale(HttpSession session,
                                                                  @RequestParam int saleId){
        SaleVO vo = SaleVO.builder().saleId(saleId).currShopId(commonService.getCurrentShopId(session)).build();
       return ResponseEntity.ok(reserveMsgService.getReserveMsgBySale(vo));
    }

    @PostMapping("/add")
    public ResponseEntity<Boolean> insertReserveMsgBySale(HttpSession session,
                                                                  @RequestBody SaleVO vo){
        int currShopId = commonService.getCurrentShopId(session);
        vo.setCurrShopId(currShopId);
        reserveMsgService.insertMsgList(vo);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/del")
    public ResponseEntity<Boolean> deleteReserveMsg(@RequestBody List<ReserveMessageVO> list){
        return ResponseEntity.ok(reserveMsgService.deleteMsgList(list));
    }

    @GetMapping("/detail")
    public ResponseEntity<List<Map<String,Object>>> getReserveMsgDetail(HttpSession session,
                                                                        @RequestParam String date){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(reserveMsgService.getReserveMsgDetail(currShopId, date));
    }

    @PostMapping("/all")
    public ResponseEntity<Map<String,Object>> getReserveMsgAll(@RequestBody(required = false) ReserveMessageVO vo){
        return ResponseEntity.ok(reserveMsgService.getReserveMsgAll(vo));
    }

}
