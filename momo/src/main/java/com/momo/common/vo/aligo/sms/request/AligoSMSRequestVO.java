package com.momo.common.vo.aligo.sms.request;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.momo.common.vo.aligo.FormEncodable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AligoSMSRequestVO implements FormEncodable {
    protected String key;
    protected String userId;

    // Send
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

    // SMS List
    private Integer page;
    private Integer pageSize;
    private String startDate;
    private Integer limitDay;
}
