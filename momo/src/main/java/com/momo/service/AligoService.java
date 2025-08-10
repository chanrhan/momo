package com.momo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.momo.common.vo.Aligo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Random;

@Service
public class AligoService {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final String BASE_URL = "https://apis.aligo.in";

    @Value("${momo.aligo.api-key}")
    private String API_KEY;
    private static final String USER_ID = "km1104rs";
    private static final String SENDER_TEL = "01039031234";

    private WebClient getWebClient(){
        return WebClient.builder()
                .baseUrl(BASE_URL)
//                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    private Integer generateAuthNumber(){
        Random random = null;
        int number = 0;
        for(int i=0;i<4;++i){
            random = new Random();
            number += random.nextInt(10) * (int)Math.pow(10, i);
        }
        return number;
    }

    public Aligo.SendSMSResponse sendOneMessage(Aligo.SendSMS vo){
        vo.setKey(API_KEY);
        vo.setUserId(USER_ID);
        vo.setSender(SENDER_TEL);
        int authNumber = generateAuthNumber();
        vo.setMsg("[모모] 회원가입 인증번호입니다 : " + authNumber);

        Aligo.SendSMSResponse res = requestAligoApi("/send/", vo.toFormValues(), Aligo.SendSMSResponse.class);
        res.setAuthNumber(authNumber);


        return res;
    }

    public Aligo.SMSListResponse getSMSList(Aligo.SMSList vo){
        return requestAligoApi("/list/", vo.toFormValues(), Aligo.SMSListResponse.class );
    }

    private <T extends Aligo.DefaultResponse> T requestAligoApi(String path, MultiValueMap<String,String> formData, Class<T> tClass){
        String body = getWebClient().post()
                .uri(ub->
                        ub.path("/send/").build())
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .accept(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
//                .onStatus(s -> s.isError(), res ->
//                        res.bodyToMono(String.class)
//                                .flatMap(b -> Mono.error(new RuntimeException("Aligo HTTP " + res.statusCode() + " body=" + b)))
//                )
                .bodyToMono(String.class)
                .block();
        try {
            return objectMapper.readValue(body, tClass);
        }catch (Exception e){
            System.out.println(body);
            throw new RuntimeException("[Aligo] 응답 파싱 실패", e);
        }
    }
}

