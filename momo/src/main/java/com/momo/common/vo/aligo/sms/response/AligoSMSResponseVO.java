package com.momo.common.vo.aligo.sms.response;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.momo.common.vo.aligo.FormEncodable;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AligoSMSResponseVO implements FormEncodable {
    protected Integer resultCode;
    protected String message;

    // Send
    private Integer msgId; // 메세지 고유 ID
    private Integer successCnt; // 요청 성공 건수
    private Integer errorCnt; // 요청 실패 건수
    private String msgType; // 메세지 타입 (1. SMS, 2. LMS, 3. MMS)
    private String authNumber;

    // SMS List
    private List<SMSListItem> list = new ArrayList<>();
    private String nextYn;

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
