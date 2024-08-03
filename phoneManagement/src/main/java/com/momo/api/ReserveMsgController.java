package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
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

    @GetMapping("/calendar")
    public ResponseEntity<List<Map<String,Integer>>> getReserveMsgForCalendar(HttpSession session,
                                                                              @RequestParam String date){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        return ResponseEntity.ok(reserveMsgService.getReserveMsgForCalendar(currShopId, date));
    }

    @GetMapping("/detail")
    public ResponseEntity<List<Map<String,Object>>> getReserveMsgDetail(HttpSession session,
                                                                        @RequestParam String date,
                                                                        @RequestParam int state){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        return ResponseEntity.ok(reserveMsgService.getReserveMsgDetail(currShopId, date, state));
    }
}
