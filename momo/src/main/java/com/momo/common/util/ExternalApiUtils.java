package com.momo.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.http.HttpRequest;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
public class ExternalApiUtils {
    private static final String LINEFEED = "\r\n";
    private static final String DOUBLE_HYPHEN = "--";
    private static final String QUTATE = "\"";
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final int RESPONSE_TIMEOUT = 5000;

    public static Map get(String baseUrl, String path, Map<String,Object> params) throws ProtocolException {
        WebClient webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .build();

        return webClient.get().uri(uriBuilder -> {
            UriBuilder ub = uriBuilder.path(path);
            if(params != null && !params.isEmpty()){
                for(String key : params.keySet()){
                    ub = ub.queryParam(key, params.get(key));
                }
            }

            return ub.build();
        }).retrieve()
                .bodyToMono(Map.class)
                .block();
    }

    public static Map post(String baseUrl, String path, Map<String,Object> params, Object body) throws ProtocolException {
        WebClient webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        return webClient.post().uri(uriBuilder -> {
                    UriBuilder ub = uriBuilder.path(path);
                    if(params != null && !params.isEmpty()){
                        for(String key : params.keySet()){
                            ub = ub.queryParam(key, params.get(key));
                        }
                    }

                    return ub.build();
                })
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body).retrieve()
                .bodyToMono(Map.class)
                .block();
    }

//    public static Map<String,Object> post(HttpURLConnection conn, String body) throws ProtocolException {
//        conn.setRequestMethod("POST");
//        conn.setDoOutput(true);
//        try{
//            log.info("body: {}", body);
//            // 데이터 본문에 싣기
//            try(DataOutputStream dos = new DataOutputStream(conn.getOutputStream())){
//                dos.write(body.getBytes(StandardCharsets.UTF_8));
//            }
//
//            return request(conn);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }

//    public static Map<String,Object> request(HttpURLConnection conn){
//        try{
//            BufferedReader br;
//            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
//                br = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
//            } else {
//                InputStream inputStream = conn.getErrorStream();
//                if(inputStream == null){
////                    throw new NullPointerException("getErrorStram() is null");
//                    br = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
//                }else{
//                    br = new BufferedReader(new InputStreamReader(inputStream));
//                }
//            }
//            StringBuilder sb = new StringBuilder();
//            String line;
//            while ((line = br.readLine()) != null) {
//                sb.append(line);
//            }
//            br.close();
//            conn.disconnect();
//
//            log.info("res: {}", sb.toString());
//            return objectMapper.readValue(sb.toString(), Map.class);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }

//    public static HttpRequest.BodyPublisher multipartToByte (Map<String, Object> map, String boundary) throws IOException {
//        List<byte[]> byteArrays = new ArrayList<>();
//        StringBuilder stringBuilder = new StringBuilder();
//
//        for (Map.Entry<String, Object> data : map.entrySet()) {
//            stringBuilder.setLength(0);
//            stringBuilder.append(DOUBLE_HYPHEN)
//                    .append(boundary)
//                    .append(LINEFEED);
//
//            if (data.getValue() instanceof Path filePath) {
//                log.info("file data: {}", filePath);
//                String mimeType = Files.probeContentType(filePath);
//                byte[] fileByte = Files.readAllBytes(filePath);
//
//                stringBuilder.append("Content-Disposition: form-data; name=")
//                        .append(QUTATE)
//                        .append(data.getKey())
//                        .append(QUTATE)
//                        .append("; filename= ")
//                        .append(QUTATE)
//                        .append(data.getValue())
//                        .append(QUTATE)
//                        .append(LINEFEED)
//                        .append("Content-Type: ")
//                        .append(mimeType)
//                        .append(LINEFEED)
//                        .append(LINEFEED);
//
//                byteArrays.add(stringBuilder.toString().getBytes(StandardCharsets.UTF_8));
//                byteArrays.add(fileByte);
//                byteArrays.add(LINEFEED.getBytes(StandardCharsets.UTF_8));
//            } else {
//                stringBuilder.append("Content-Disposition: form-data; name=")
//                        .append(QUTATE)
//                        .append(data.getKey())
//                        .append(QUTATE)
//                        .append(";")
//                        .append(LINEFEED)
//                        .append(LINEFEED)
//                        .append(data.getValue())
//                        .append(LINEFEED);
//
//                byteArrays.add(stringBuilder.toString().getBytes(StandardCharsets.UTF_8));
//            }
//        }
//
//        stringBuilder.setLength(0);
//        stringBuilder.append(DOUBLE_HYPHEN)
//                .append(boundary)
//                .append(DOUBLE_HYPHEN);
//        byteArrays.add(stringBuilder.toString().getBytes(StandardCharsets.UTF_8));
//
//        return HttpRequest.BodyPublishers.ofByteArrays(byteArrays);
//    }
}
