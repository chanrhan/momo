package com.momo.common.vo.aligo.alimtalk.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.coyote.http11.filters.SavedRequestInputFilter;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AlimTalkMsgResultItem {
    private Integer mid; // 메세지 ID
    private String type; // 문자구분(유형)
    private String sender; // 발신번호
    private Integer msgCount; // 전송요청수
    private String mbody; // 메시지 내용
    private String reserveDate; //메시지 예약일
    private String reserveState; // 메세지 상태
    private String regdate; // 등록일

    // history/detail
    private String msgid; // 메시지 상세ID (전송중인 경우 앞에 "Q" 가 붙음)
//    private String type; //
//    private String sender; // 발신번호
    private String phone; // 수신번호
    private Integer status; // 메시지 상태 (2 : 카카오 인식불가 번호포맷, 3 : 카카오 인식가능 번호포맷)
    private String reqdate; // 요청일
    private String sentdate; // 전송일
    private String rsltdate; // 응답일
    private String reportdate; // 결과값갱신일
    private String rslt; // 상태
    private String rsltMessage; // 사유
    private String meesage; // 전송한 내용
    private String buttonJson; // 버튼내용
    private String tplCode; //  템플릿 코드
    private String senderKey; //  프로파일키
    private Integer smid; // 대체문자 전송시 mid
}
