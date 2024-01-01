package com.momo.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONObject;

import java.io.*;
import java.net.*;

// 국세청_사업자등록정보 진위확인 및 상태조회 서비스
// https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15081808

public class BusinessmanApiUtil extends PublicDataOpenApiUtil{
	private static final String serviceUrl = "https://api.odcloud.kr/api/nts-businessman/v1/validate";
	public static JSONObject validate(String data){
		StringBuilder urlBuilder = new StringBuilder(serviceUrl);
		try{
			urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey); /*Service Key*/
			urlBuilder.append("&" + URLEncoder.encode("returnType", "UTF-8") + "=" + URLEncoder.encode("JSON", "UTF-8"));

			URL url = new URL(urlBuilder.toString());

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-type", "application/json; utf-8");

			// 데이터 본문에 싣기
			try(DataOutputStream dos = new DataOutputStream(conn.getOutputStream())){
				dos.write(data.getBytes("UTF-8"));
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

			return objectMapper.readValue(sb.toString(),JSONObject.class);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public static void search(){

	}
}
