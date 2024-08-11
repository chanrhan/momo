package com.momo.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class ExternalApiUtils {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static Map<String,Object> request(HttpURLConnection conn, Map<String,Object> body){
        String json = JSONObject.toJSONString(body);
        log.info("status body json: {}", json);
        try{
            // 데이터 본문에 싣기
            try(DataOutputStream dos = new DataOutputStream(conn.getOutputStream())){
                dos.write(json.getBytes(StandardCharsets.UTF_8));
            }

            BufferedReader br;
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            br.close();
            conn.disconnect();
            return objectMapper.readValue(sb.toString(), Map.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
