package com.momo.extern_api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkProfileResponseVO;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkResponseVO;
import com.momo.common.vo.aligo.sms.response.AligoSMSResponseVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
public class AligoApiUtil {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final String BASE_URL_apis = "https://apis.aligo.in";
    private static final String BASE_URL_kakaoapi = "https://kakaoapi.aligo.in";

    private static String API_KEY;
    private static String SENDER_KEY;
    private static final String USER_ID = "km1104rs";

    public static void setApiKey(String apiKey){
        API_KEY = apiKey;
    }
    public static void setSenderKey(String senderKey){
        SENDER_KEY = senderKey;
    }

    private static WebClient getWebClient(String baseUrl){
        return WebClient.builder()
                .baseUrl(baseUrl)
//                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public static AligoSMSResponseVO requestSMSAligoApi(String path, MultiValueMap<String,String> formData){
        formData.add("key", API_KEY);
        formData.add("user_id", USER_ID);
        return post(BASE_URL_apis, path, formData, AligoSMSResponseVO.class);
    }

    private static  <T> T post(String baseUrl, String path, MultiValueMap<String,String> formData, Class<T> tClass){
        String body = getWebClient(baseUrl).post()
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

    public static <T> T requesAlimTalkApi(String path, MultiValueMap<String,String> formData, Class<T> tClass){
        formData.add("apikey", API_KEY);
        formData.add("userid", USER_ID);
        formData.add("senderkey", SENDER_KEY);
//        System.out.println(formData);
        return post(BASE_URL_kakaoapi,path, formData, tClass);
    }
}
