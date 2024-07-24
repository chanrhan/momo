package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
import com.momo.service.ReserveMsgService;
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
    public ResponseEntity<List<Map<String,Integer>>> getReserveMsgForCalendar(@RequestParam String date){
        String username = SecurityContextUtil.getUsername();
        return ResponseEntity.ok(reserveMsgService.getReserveMsgForCalendar(username, date));
    }

    @GetMapping("/detail")
    public ResponseEntity<List<Map<String,Object>>> getReserveMsgDetail(@RequestParam String date,
                                                                        @RequestParam int state){
        String username = SecurityContextUtil.getUsername();
        return ResponseEntity.ok(reserveMsgService.getReserveMsgDetail(username, date, state));
    }
}
