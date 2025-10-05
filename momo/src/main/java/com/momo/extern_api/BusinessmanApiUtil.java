package com.momo.extern_api;

import com.momo.common.util.PublicDataOpenApiUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;

import java.util.*;

// 국세청_사업자등록정보 진위확인 및 상태조회 서비스
// https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15081808
// 대표님 사업자번호
// -> 5218702490

// 사업자번호만으로 조회하려면 유료 API가 필요한 듯하다
// 일단 추후에 다시 알아보자
@Slf4j
public class BusinessmanApiUtil extends PublicDataOpenApiUtil {
	private static final String SERVICE_URL = "https://api.odcloud.kr/api/nts-businessman/v1/validate";
	private static final String BASE_URL = "https://api.odcloud.kr/api/nts-businessman/v1";

	public static Map<String, Object> validate(Map<String,String> map){
		Map<String,Object> body = new HashMap<>();
		List<Map<String,String>> businesses = new ArrayList<>();
		map.put("start_dt",map.get("start_dt").replace("-",""));
		map.put("b_nm","");
		map.put("corp_no","");
		map.put("b_sector","");
		map.put("b_type","");
		map.put("b_adr","");
		businesses.add(map);
		body.put("businesses",businesses);
//		String json = JSONObject.toJSONString(body);
//		System.out.println(json);

		WebClient webClient = WebClient.builder()
				.baseUrl(BASE_URL)
				.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.build();

		Map res = webClient.post().uri(ub->ub.queryParam("serviceKey", SERVICE_KEY)
				.queryParam("returnType", "JSON").build())
				.bodyValue(body)
				.retrieve().bodyToMono(Map.class)
				.block();
		return res;

//		StringBuilder urlBuilder = new StringBuilder(SERVICE_URL);
//		try{
//			urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + SERVICE_KEY); /*Service Key*/
//			urlBuilder.append("&" + URLEncoder.encode("returnType", "UTF-8") + "=" + URLEncoder.encode("JSON", "UTF-8"));
//
//			URL url = new URL(urlBuilder.toString());
//
//			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//			conn.setDoOutput(true);
//			conn.setRequestMethod("POST");
//			conn.setRequestProperty("Content-type", "application/json; utf-8");
//
//			// 데이터 본문에 싣기
//			try(DataOutputStream dos = new DataOutputStream(conn.getOutputStream())){
//				dos.write(json.getBytes("UTF-8"));
//			}
//
//
//			BufferedReader br;
//			if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
//				br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//			} else {
//				br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
//			}
//			StringBuilder sb = new StringBuilder();
//			String line;
//			while ((line = br.readLine()) != null) {
//				sb.append(line);
//			}
//			br.close();
//			conn.disconnect();
//
//			return objectMapper.readValue(sb.toString(),Map.class);
//		} catch (IOException e) {
//			throw new RuntimeException(e);
//		}
	}

	public static boolean status(String bpNo){
		Map<String,Object> body = new HashMap<>();
		body.put("b_no", List.of(bpNo));

        WebClient webClient = WebClient.builder()
                .baseUrl(BASE_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        Map res = webClient.post().uri(uriBuilder -> {
                    UriBuilder ub = uriBuilder.path("/status");
                    return ub.queryParam("serviceKey",SERVICE_KEY).build();
                })
                .bodyValue(body).retrieve()
                .bodyToMono(Map.class)
                .block();
        log.info("result: {}", res);
        Object matchCnt = res.get("match_cnt");
        return matchCnt != null && Integer.parseInt(matchCnt.toString()) > 0;
    }

	public static void search(){

	}
}
