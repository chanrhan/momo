package com.momo.common.vo;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.*;
import java.util.stream.Collectors;

public class Aligo {
    /** 공통: 폼 변환을 위한 믹스인/인터페이스 */
    public interface FormEncodable {
        ObjectMapper MAPPER = new ObjectMapper()
                .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)
                .setSerializationInclusion(JsonInclude.Include.NON_NULL);

        /** 공통 변환 로직: POJO -> Map -> MultiValueMap (null 제거, 컬렉션/배열 콤마 조인) */
        default MultiValueMap<String, String> toFormValues() {
            Map<String, Object> map = MAPPER.convertValue(this, new TypeReference<Map<String, Object>>() {});
            LinkedMultiValueMap<String, String> form = new LinkedMultiValueMap<>();
            for (Map.Entry<String, Object> e : map.entrySet()) {
                Object v = e.getValue();
                if (v == null) continue;
                if (v.getClass().isArray()) {
                    Object[] arr = (Object[]) v;
                    form.add(e.getKey(), join(arr));
                } else if (v instanceof Collection<?> col) {
                    form.add(e.getKey(), join(col.toArray()));
                } else {
                    form.add(e.getKey(), v.toString());
                }
            }
            return form;
        }

        private static String join(Object[] arr) {
            return Arrays.stream(arr).filter(Objects::nonNull).map(Object::toString)
                    .collect(Collectors.joining(","));
        }
    }

    @Data
    @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static abstract class DefaultRequest implements FormEncodable{
        protected String key;
        protected String userId;
    }

    @Data
    @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static abstract class DefaultResponse {
        protected Integer resultCode;
        protected String message;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    @NoArgsConstructor
    public static class SendSMS extends DefaultRequest {
        private String sender;
        private String receiver;
        private String destination;
        private String msg;
        private String msgType;
        private String title;
        private String rdate; // 예약날짜
        private String rtime; // 예약시간
        private String image1;
        private String image2;
        private String image3;
        private String testmode_yn = "N";

    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    @NoArgsConstructor
    public static class SendSMSResponse extends DefaultResponse{
        private Integer msgId; // 메세지 고유 ID
        private Integer successCnt; // 요청 성공 건수
        private Integer errorCnt; // 요청 실패 건수
        private String msgType; // 메세지 타입 (1. SMS, 2. LMS, 3. MMS)
        private String authNumber;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    @NoArgsConstructor
    public static class SMSList extends DefaultRequest {
        private Integer page;
        private Integer pageSize;
        private String startDate;
        private Integer limitDay;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    @NoArgsConstructor
    public static class SMSListResponse extends DefaultResponse{
        private List<SMSListItem> list = new ArrayList<>();
        private String nextYn;
    }

    @Data
    @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class SMSListItem{
        private Integer mid;
        private String type;
        private String sender;
        private Integer smsCount;
        private String reserveState;
        private String msg;
        private Integer failCount;
        private String regDate;
        private String reserve;
    }


}
