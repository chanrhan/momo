package com.momo.controller;

import com.momo.common.vo.Aligo;
import com.momo.common.vo.AligoSMSSendVO;
import com.momo.common.vo.UserVO;
import com.momo.service.AligoService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/aligo")
@RequiredArgsConstructor
public class AligoController {
    private final AligoService aligoService;

    @PostMapping("/sms/send/auth")
    public ResponseEntity<Aligo.SendSMSResponse> sendAuthNumber(@RequestBody Aligo.SendSMS vo){
        Aligo.SendSMSResponse res = aligoService.sendOneMessage(vo);
        System.out.println(res);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/sms/list")
    public ResponseEntity<Aligo.SMSListResponse> getMessageList(@RequestBody Aligo.SMSList vo){
        return ResponseEntity.ok(aligoService.getSMSList(vo));
    }

    @GetMapping("/sms/test")
    public ResponseEntity<Boolean> smsTest(){

        return ResponseEntity.ok(true);
    }
}
