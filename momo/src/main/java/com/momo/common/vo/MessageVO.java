package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.momo.common.vo.aligo.alimtalk.request.AlimTalkMsgRequestVO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class MessageVO extends BaseVO {
//    private String userId;
    private Integer shopId;
    private Integer saleId;
    private Integer msgId;
    private String rsvDt;
    private Integer msgSt;

    private String tplCode; // 알림톡 템플릿 코드 (7자리)
    private Integer tplId; // Template ID
    private Integer grpCode; // 메세지 그룹 코드

//    private Integer currShopId;

    private String content;

    private Integer dday;

    private Integer msgTp;
    private Integer rsvTp;
    private String regiDt;

    private String custTel;
    private String custNm;
    private String shopNm;

    private String reqId;
    private String reqDt;

    public AlimTalkMsgRequestVO toAlimTalkMsgRequestVO(){
        return AlimTalkMsgRequestVO.builder()
                .tplCode(tplCode)
                .senddate(rsvDt)
                .receiver1(custTel)
                .recvname1(custNm)
                .build();
    }
}
