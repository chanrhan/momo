package com.momo.common.vo.aligo.alimtalk.response;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.momo.common.vo.aligo.FormEncodable;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public abstract class AlimTalkResponseVO implements FormEncodable {
    protected Integer code; // 결과코드 (API 수신유무)
    protected String message; // API 호출에 대한 결과 메세지
}
