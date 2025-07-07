package com.momo.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Map;

// 과학기술정보통신부 우정사업본부_우편번호 정보조회
// https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15056971

public class AddressApiUtil{
	// 서비스 url
	protected static final ObjectMapper objectMapper = new ObjectMapper();
	protected static final Charset UTF_8 = StandardCharsets.UTF_8;

	private static final String serviceUrl = "https://business.juso.go.kr/addrlink/addrLinkApi.do";
	private static final String API_KEY = "U01TX0FVVEgyMDI0MTIzMDAyMzIwNzExNTM3MDQ=";

	public static Map<String, Object> getAddress(String keyword, int currPage) {
		StringBuilder urlBuilder = new StringBuilder(serviceUrl);
		try {
			urlBuilder.append("?" + URLEncoder.encode("confmKey", UTF_8) + "=" + API_KEY);
			urlBuilder.append("&" + URLEncoder.encode("currentPage", UTF_8) + "=" + currPage);
			urlBuilder.append("&" + URLEncoder.encode("countPerPage", UTF_8) + "=" + URLEncoder.encode("100", UTF_8));
			urlBuilder.append("&" + URLEncoder.encode("resultType", UTF_8) + "=" + URLEncoder.encode("json", UTF_8));
			urlBuilder.append("&" + URLEncoder.encode("keyword", UTF_8) + "=" + URLEncoder.encode(keyword, UTF_8));

			URL url = new URL(urlBuilder.toString());

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			BufferedReader br;
			if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
				br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			}
			else {
				br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}
			StringBuilder sb = new StringBuilder();
			String        line;
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			br.close();
			conn.disconnect();

			return objectMapper.readValue(sb.toString(),Map.class);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}


}
