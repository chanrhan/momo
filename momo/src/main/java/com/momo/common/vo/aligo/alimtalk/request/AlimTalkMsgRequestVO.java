package com.momo.common.vo.aligo.alimtalk.request;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
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
    private String receiver1;
    private String recvname1;
    private String subject1;
    private String message1;
    private String emtitle;
    private String button1;
    private String failover;
    private String fsubject1;
    private String fmessage1;
    private String testMode;

    public void setButton1(AlimTalkTemplateRequestVO.TemplateButton button1){
//        this.button1 =
    }

    // history/list
    private Integer page;
    private Integer limit;
    private String startdate;
    private String enddate;

    // history/detail
    private Integer mid;

}
