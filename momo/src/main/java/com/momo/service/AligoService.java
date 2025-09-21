package com.momo.service;

import com.momo.common.vo.aligo.alimtalk.request.AlimTalkProfileRequestVO;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkResponseVO;
import com.momo.common.vo.aligo.sms.request.AligoSMSRequestVO;
import com.momo.common.vo.aligo.sms.response.AligoSMSResponseVO;
import com.momo.extern_api.AligoApiUtil;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class AligoService {
    private static final String Authenticate_Kakao_Channel = "/akv10/profile/auth/";
    private static final String Add_Profile = "/akv10/profile/add/";
    private static final String Template_List = "/akv10/template/list/";
    private static final String Template_Add = "/akv10/template/add/";
    private static final String Template_Modify = "/akv10/template/modify/";
    private static final String Template_Delete = "/akv10/template/del/";
    private static final String Template_Request = "/akv10/template/request/";
    private static final String Alimtalk_Send = "/akv10/alimtalk/send/";
    private static final String History_List = "/akv10/history/list/";
    private static final String History_Detail = "/akv10/history/detail/";

    @Value("${momo.aligo.corp-tel}")
    private  String SENDER_TEL;

    @Value("${momo.aligo.admin-tel}")
    private  String ADMIN_TEL;

    @Value("${momo.aligo.kakao-channel-plus-id}")
    private  String PLUS_ID;

    @Value("${momo.aligo.api-key}")
    private String API_KEY;

    @PostConstruct
    private void init(){
        AligoApiUtil.setApiKey(API_KEY);
    }

    private String generateAuthNumber(){
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<4;++i){
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }

    public AligoSMSResponseVO sendOneMessage(AligoSMSRequestVO vo){
//        vo.setKey(API_KEY);
//        vo.setUserId(USER_ID);
        vo.setSender(SENDER_TEL);
        String authNumber = generateAuthNumber();
        vo.setMsg("[모모] 인증번호 [" + authNumber + "]를 입력해주세요.");

        AligoSMSResponseVO res = AligoApiUtil.requestSMSAligoApi("/send/", vo.toFormValues());
        res.setAuthNumber(authNumber);

        return res;
    }

    public AligoSMSResponseVO getSMSList(AligoSMSRequestVO vo){
        return AligoApiUtil.requestSMSAligoApi("/list/", vo.toFormValues());
    }

    public AlimTalkResponseVO authenticateKakaoChannel(){
        AlimTalkProfileRequestVO vo = new AlimTalkProfileRequestVO();
        vo.setPlusId(PLUS_ID);
        vo.setPhonenumber(ADMIN_TEL);
        return AligoApiUtil.requesAlimTalkApi(Authenticate_Kakao_Channel, vo.toFormValues());
    }
}

