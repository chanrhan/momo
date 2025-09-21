package com.momo.common.vo.aligo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Arrays;
import java.util.Collection;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

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