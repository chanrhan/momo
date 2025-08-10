package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AligoSendResponseVO {
    private Integer resultCode;
    private String message; // 결과 메세지
    private Integer msgId; // 메세지 고유 ID
    private Integer successCnt; // 요청 성공 건수
    private Integer errorCnt; // 요청 실패 건수
    private String msgType; // 메세지 타입 (1. SMS, 2. LMS, 3. MMS)
}
