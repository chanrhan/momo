package com.momo.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

public class ExternalApiUtils {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static Map<String, Object> solvedacAPIRequest(String uri) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .header("x-solvedac-language", "ko")
                .header("Accept", "application/json")
                .GET()
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        Map<String, Object> map = objectMapper.readValue(response.body(), Map.class);
        System.out.println(map);
        return map;
    }

    public static void sendHttpRequest(HttpRequest request) throws IOException, InterruptedException {

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }


}
