package com.momo.service;

import com.momo.common.vo.MessageVO;
import com.momo.common.vo.aligo.alimtalk.request.AlimTalkMsgRequestVO;
import com.momo.common.vo.aligo.alimtalk.request.AlimTalkProfileRequestVO;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkMsgResponseVO;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkProfileResponseVO;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkResponseVO;
import com.momo.common.vo.aligo.sms.request.AligoSMSRequestVO;
import com.momo.common.vo.aligo.sms.response.AligoSMSResponseVO;
import com.momo.extern_api.AligoApiUtil;
import com.momo.mapper.MessageMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AligoService {
    private final MessageMapper messageMapper;
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

    @Value("${momo.aligo.sender-key}")
    private String SENDER_KEY;

    @PostConstruct
    private void init(){
        AligoApiUtil.setApiKey(API_KEY);
        AligoApiUtil.setSenderKey(SENDER_KEY);
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

    public AlimTalkProfileResponseVO authenticateKakaoChannel(){
        AlimTalkProfileRequestVO vo = new AlimTalkProfileRequestVO();
        vo.setPlusid("@모바일의모든것");
//        vo.setPlusid(PLUS_ID);
        vo.setPhonenumber(ADMIN_TEL);
        AlimTalkProfileResponseVO res = AligoApiUtil.requesAlimTalkApi(Authenticate_Kakao_Channel, vo.toFormValues(), AlimTalkProfileResponseVO.class);
        System.out.println(res);
        return res;
    }

    public Map<String,Object> getAlimtalkHistoryList(AlimTalkMsgRequestVO vo){
        Map<String,Object> res = AligoApiUtil.requesAlimTalkApi(History_List, vo.toFormValues(), Map.class);
        System.out.println(res);
        return res;
    }
    public Map<String,String> getAlimtalkHistoryDetail(AlimTalkMsgRequestVO vo){
        return AligoApiUtil.requesAlimTalkApi(History_Detail, vo.toFormValues(), Map.class);
    }

    // 여러 명의 사람들에게 여러 번 전송
    // 수신자를 여러 명으로 해서 한번의 API 로 요청할 수 있지만, 동일 템플릿에서만 가능하다.
    // 근데 어차피 API 비용은 1건 당 요금이므로, 여러 템플릿 문자를 보낼 꺼면 여러 번 요청해도 된다.
    public void sendAlimtalkToMany(List<MessageVO> list){
        AlimTalkMsgRequestVO at = null;
        AlimTalkMsgResponseVO res = null;
        for(MessageVO msg : list){
            String tplCode = messageMapper.getAlimtalkTemplateCode(msg.getTplId());
            at = AlimTalkMsgRequestVO.builder()
                    .tplCode(tplCode)
                    .senddate(msg.getRsvDt())
                    .receiver1(msg.getCustTel())
                    .recvname1(msg.getCustNm())
                    .subject1("테스트 제목")
                    .message1("테스트 내용")
                    .build();
            res = sendAlimTalk(at);
            msg.setMsgSt(res.getCode() == 200 ? 0 : 1);
        }
        messageMapper.insertMessageHistoryMany(list);
    }

    public AlimTalkMsgResponseVO sendAlimTalk(AlimTalkMsgRequestVO vo){
        vo.setSender(SENDER_TEL);
        vo.setMessage1("");
        return AligoApiUtil.requesAlimTalkApi(Alimtalk_Send, vo.toFormValues(), AlimTalkMsgResponseVO.class);
    }

    public AlimTalkMsgResponseVO getAlimtalkTemplateList(AlimTalkMsgRequestVO vo){
        AlimTalkMsgResponseVO res = AligoApiUtil.requesAlimTalkApi(Template_List, vo.toFormValues(), AlimTalkMsgResponseVO.class);
        System.out.println(res);

        return res;
    }
}

