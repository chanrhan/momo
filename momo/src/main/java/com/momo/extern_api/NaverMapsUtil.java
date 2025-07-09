package com.momo.extern_api;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Slf4j
@Component
public class NaverMapsUtil {
//    @Value("${momo.navermaps.client_id}")
    public static final String CLIENT_ID = "5tpuwj9dhc";

//    @Value("${momo.navermaps.client_secret}")
    public static final String CLIENT_SECRET = "5KT4vtGYVlPV9F5X5QqooqnJC2IQJqT6qFKmKkop";

    public static final String BASE_URL = "https://maps.apigw.ntruss.com/map-geocode/v2";

    public static Map getGecode(String addr){
        System.out.println(CLIENT_ID);
        System.out.println(CLIENT_SECRET);
        WebClient webClient = WebClient.builder()
                .baseUrl(BASE_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
        return webClient.get()
                .uri(ub->
                ub.path("/geocode").queryParam("query", addr)
                        .build())
                .header("x-ncp-apigw-api-key-id", CLIENT_ID)
                .header("x-ncp-apigw-api-key", CLIENT_SECRET)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }

}
