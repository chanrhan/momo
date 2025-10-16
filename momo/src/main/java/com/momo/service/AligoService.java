package com.momo.service;

import com.momo.common.enums.codes.CommonErrorCode;
import com.momo.common.enums.codes.ErrorCode;
import com.momo.common.vo.MessageVO;
import com.momo.common.vo.SaleVO;
import com.momo.common.vo.aligo.alimtalk.request.AlimTalkMsgRequestVO;
import com.momo.common.vo.aligo.alimtalk.request.AlimTalkProfileRequestVO;
import com.momo.common.vo.aligo.alimtalk.request.AlimTalkTemplateRequestVO;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkMsgResponseVO;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkProfileResponseVO;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkTemplateItem;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkTemplateResponseVO;
import com.momo.common.vo.aligo.sms.request.AligoSMSRequestVO;
import com.momo.common.vo.aligo.sms.response.AligoSMSResponseVO;
import com.momo.exception.BusinessException;
import com.momo.extern_api.AligoApiUtil;
import com.momo.extern_api.AlimtalkTemplateGenerator;
import com.momo.mapper.MessageMapper;
import com.momo.mapper.SaleMapper;
import com.momo.mapper.ShopMapper;
import com.momo.mapper.UserMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class AligoService {
    private final MessageMapper messageMapper;
    private final UserMapper userMapper;
    private final SaleMapper saleMapper;
    private final ShopMapper shopMapper;

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
        vo.setPage(1);
        vo.setLimit(50);
        return AligoApiUtil.requesAlimTalkApi(History_Detail, vo.toFormValues(), Map.class);
    }

    // 여러 명의 사람들에게 여러 번 전송
    // 수신자를 여러 명으로 해서 한번의 API 로 요청할 수 있지만, 동일 템플릿에서만 가능하다.
    // 근데 어차피 API 비용은 1건 당 요금이므로, 여러 템플릿 문자를 보낼 꺼면 여러 번 요청해도 된다.
    public void sendAlimtalkToMany(SaleVO vo){
        AlimTalkMsgRequestVO at = null;
        AlimTalkMsgResponseVO res = null;
        int shopId = vo.getCurrShopId();
        int saleId = vo.getSaleId();
        Map<String,Object> sale = saleMapper.getSaleOne(shopId, saleId);
        String custTel, custNm;
        try {
            custTel = Objects.toString(sale.get("cust_tel"));
            custNm = Objects.toString(sale.get("cust_nm"));
        }catch (NullPointerException e){
            throw new NullPointerException("판매일보의 고객 전화번호 및 이름이 없습니다!");
        }
        List<MessageVO> list = vo.getRsvMsgList();
        AlimtalkTemplateGenerator generator = AlimtalkTemplateGenerator.builder()
                .shopId(shopId)
                .saleId(saleId)
                .shopMapper(shopMapper)
                .saleMapper(saleMapper)
                .build();
        for(MessageVO msg : list){
            String tplCode = messageMapper.getAlimtalkTemplateCode(msg.getTplId());
            at = AlimTalkMsgRequestVO.builder()
                    .tplCode(tplCode)
                    .senddate(msg.getRsvDt())
                    .receiver_1(custTel)
                    .recvname_1(custNm)
//                    .subject_1("테스트 제목")
//                    .message_1("테스트 내용")
                    .build();
            try{
                AlimTalkTemplateItem tpl = getAlimtalkTemplateList(
                        AlimTalkTemplateRequestVO.builder()
                                .tplCode(tplCode)
                                .build()
                ).getList().get(0);
                at = generator.generate(tpl, at);
                res = sendAlimTalk(at);
                msg.setMsgSt(res.getCode() == 200 ? 0 : 1);
            }catch (Exception e){
                e.printStackTrace();
                throw new BusinessException(CommonErrorCode.INTERNAL_SERVER_ERROR);
            }
        }
        messageMapper.insertMessageHistoryMany(vo.getCurrShopId(), vo.getSaleId(), list);
    }

    public AlimTalkMsgResponseVO sendAlimTalk(AlimTalkMsgRequestVO vo){
        vo.setSender(SENDER_TEL);
        MultiValueMap<String,String> form = vo.toFormValues();
        form.add("senderkey", SENDER_KEY);
//        vo.setSenderKey(SENDER_KEY);
        return AligoApiUtil.requesAlimTalkApi(Alimtalk_Send, form, AlimTalkMsgResponseVO.class);
    }

    public String getAlimtalkTemplateContent(int shopId, int saleId, String tplCode){
        try{
            AlimTalkTemplateItem tpl = getAlimtalkTemplateList(
                    AlimTalkTemplateRequestVO.builder()
                            .tplCode(tplCode)
                            .build()
            ).getList().get(0);

            AlimtalkTemplateGenerator generator = AlimtalkTemplateGenerator.builder()
                    .shopId(shopId)
                    .saleId(saleId)
                    .shopMapper(shopMapper)
                    .saleMapper(saleMapper)
                    .build();

            return generator.mapContent(tpl);
        }catch (Exception e){
            e.printStackTrace();
        }
       return null;
    }

    public AlimTalkTemplateResponseVO getAlimtalkTemplateList(AlimTalkTemplateRequestVO vo){
        MultiValueMap<String,String> form = vo.toFormValues();
        form.add("senderkey", SENDER_KEY);
        AlimTalkTemplateResponseVO res = AligoApiUtil.requesAlimTalkApi(Template_List, form, AlimTalkTemplateResponseVO.class);
//        System.out.println(res);
        return res;
    }
}

