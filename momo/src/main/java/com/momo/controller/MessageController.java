package com.momo.controller;

import com.momo.common.vo.MessageVO;
import com.momo.common.vo.SaleVO;
import com.momo.common.vo.aligo.alimtalk.request.AlimTalkMsgRequestVO;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkMsgResponseVO;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkProfileResponseVO;
import com.momo.common.vo.aligo.sms.request.AligoSMSRequestVO;
import com.momo.common.vo.aligo.sms.response.AligoSMSResponseVO;
import com.momo.service.AligoService;
import com.momo.service.CommonService;
import com.momo.service.MessageService;
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
public class MessageController {
    private final AligoService aligoService;
    private final MessageService messageService;
    private final CommonService commonService;

    @GetMapping("/calendar")
    public ResponseEntity<List<String>> getReserveMsgForCalendar(HttpSession session,
                                                                              @RequestParam String date){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(messageService.getReserveMsgForCalendar(currShopId, date));
    }

//    @GetMapping("/sale")
//    public ResponseEntity<List<Map<String,Object>>> getReserveMsgBySale(HttpSession session,
//                                                                  @RequestParam int saleId){
//        SaleVO vo = SaleVO.builder().saleId(saleId).currShopId(commonService.getCurrentShopId(session)).build();
//       return ResponseEntity.ok(messageService.getReserveMsgBySale(vo));
//    }

    @PostMapping("/send")
    public ResponseEntity<Boolean> insertReserveMsgBySale(HttpSession session,
                                                                  @RequestBody SaleVO vo){
        int currShopId = commonService.getCurrentShopId(session);
        vo.setCurrShopId(currShopId);
        messageService.insertMsgList(vo);
        aligoService.sendAlimtalkToMany(vo.getRsvMsgList());
        return ResponseEntity.ok(true);
    }

//    @PostMapping("/del")
//    public ResponseEntity<Boolean> deleteReserveMsg(@RequestBody List<MessageVO> list){
//        return ResponseEntity.ok(messageService.deleteMsgList(list));
//    }

    @GetMapping("/detail")
    public ResponseEntity<List<Map<String,Object>>> getReserveMsgDetail(HttpSession session,
                                                                        @RequestParam String date){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(messageService.getReserveMsgDetail(currShopId, date));
    }

    @PostMapping("/all")
    public ResponseEntity<Map<String,Object>> getReserveMsgAll(@RequestBody(required = false) MessageVO vo){
        return ResponseEntity.ok(messageService.getReserveMsgAll(vo));
    }


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

    @PostMapping("/alimtalk/auth")
    public ResponseEntity<AlimTalkProfileResponseVO> authenticateKakaoChannel(){
        return ResponseEntity.ok(aligoService.authenticateKakaoChannel());
    }

    @PostMapping("/alimtalk/history/list")
    public ResponseEntity<Map<String,Object>> getAlimtalkHistoryList(@RequestBody AlimTalkMsgRequestVO vo){
        return ResponseEntity.ok(aligoService.getAlimtalkHistoryList(vo));
    }

    @PostMapping("/alimtalk/history/detail")
    public ResponseEntity<Map<String,String>> getAlimtalkHistoryDetail(@RequestBody AlimTalkMsgRequestVO vo){
        return ResponseEntity.ok(aligoService.getAlimtalkHistoryDetail(vo));
    }

    @PostMapping("/alimtalk/template/list")
    public ResponseEntity<AlimTalkMsgResponseVO> getAlimtalkTemplateList(@RequestBody AlimTalkMsgRequestVO vo){
        return ResponseEntity.ok(aligoService.getAlimtalkTemplateList(vo));
    }

//    @PostMapping("/alimtalk/send")
//    public ResponseEntity<Map<String,Object>> sendAlimTalk(@RequestBody AlimTalkMsgRequestVO vo){
//        return ResponseEntity.ok(aligoService.sendAlimTalk(vo));
//    }

    // 알림톡 템플릿 관리
    @PostMapping("/template/list")
    public ResponseEntity<List<Map<String,Object>>> getMessageTemplateList(@RequestBody MessageVO vo){
        return ResponseEntity.ok(messageService.getMessageTemplateList(vo));
    }

    @PostMapping("/template")
    public ResponseEntity<Boolean> insertMessageTemplate(@RequestBody MessageVO vo){
        messageService.insertAlimtalkTemplate(vo);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/template/update")
    public ResponseEntity<Boolean> updateMessageTemplate(@RequestBody MessageVO vo){
        return ResponseEntity.ok(messageService.updateAlimtalkTemplate(vo) > 0);
    }

    @PostMapping("/template/del")
    public ResponseEntity<Boolean> deleteMessageTemplate(@RequestBody MessageVO vo){
        return ResponseEntity.ok(messageService.deleteAlimtalkTemplate(vo) > 0);
    }

}
