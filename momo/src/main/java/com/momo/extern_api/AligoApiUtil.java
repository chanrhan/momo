package com.momo.extern_api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkResponseVO;
import com.momo.common.vo.aligo.sms.response.AligoSMSResponseVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
public class AligoApiUtil {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final String BASE_URL = "https://apis.aligo.in";

    private static String API_KEY;
    private static final String USER_ID = "km1104rs";

    public static void setApiKey(String apiKey){
        API_KEY = apiKey;
    }

    private static WebClient getWebClient(){
        return WebClient.builder()
                .baseUrl(BASE_URL)
//                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public static AligoSMSResponseVO requestSMSAligoApi(String path, MultiValueMap<String,String> formData){
        formData.add("key", API_KEY);
        formData.add("user_id", USER_ID);
        return request(path, formData, AligoSMSResponseVO.class);
    }

    private static  <T> T request(String path, MultiValueMap<String,String> formData, Class<T> tClass){
        String body = getWebClient().post()
                .uri(ub->
                        ub.path(path).build())
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .accept(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .bodyToMono(String.class)
                .block();
        try {
            return objectMapper.readValue(body, tClass);
        }catch (Exception e){
//            System.out.println(body);
            throw new RuntimeException("[Aligo] 응답 파싱 실패", e);
        }
    }

    public static AlimTalkResponseVO requesAlimTalkApi(String path, MultiValueMap<String,String> formData){
        formData.add("apikey", API_KEY);
        formData.add("userid", USER_ID);
        return request(path, formData, AlimTalkResponseVO.class);
    }
}
