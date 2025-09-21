package com.momo.controller;

import com.momo.common.vo.aligo.sms.request.AligoSMSRequestVO;
import com.momo.common.vo.aligo.sms.response.AligoSMSResponseVO;
import com.momo.service.AligoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/aligo")
@RequiredArgsConstructor
public class AligoController {
    private final AligoService aligoService;

    @PostMapping("/sms/send/auth")
    public ResponseEntity<AligoSMSResponseVO> sendAuthNumber(@RequestBody AligoSMSRequestVO vo){
        AligoSMSResponseVO res = aligoService.sendOneMessage(vo);
        System.out.println(res);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/sms/list")
    public ResponseEntity<AligoSMSResponseVO> getMessageList(@RequestBody AligoSMSRequestVO vo){
        return ResponseEntity.ok(aligoService.getSMSList(vo));
    }

    @GetMapping("/sms/test")
    public ResponseEntity<Boolean> smsTest(){

        return ResponseEntity.ok(true);
    }
}
