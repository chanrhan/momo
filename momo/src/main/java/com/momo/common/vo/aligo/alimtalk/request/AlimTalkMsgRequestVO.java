package com.momo.common.vo.aligo.alimtalk.request;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@SuperBuilder
public class AlimTalkMsgRequestVO extends AlimTalkRequestVO{
    // alimtalk/send
    private String sender;
    private String senddate;
    private String tplCode;
    private String receiver_1;
    private String recvname_1;
    private String subject_1;
    private String message_1;
    private String emtitle;
    private String button_1;
    private String failover;
    private String fsubject_1;
    private String fmessage_1;
    private String testMode;
    // history/list
    private Integer page;
    private Integer limit;
    private String startdate;
    private String enddate;

    // history/detail
    private Integer mid;

}
