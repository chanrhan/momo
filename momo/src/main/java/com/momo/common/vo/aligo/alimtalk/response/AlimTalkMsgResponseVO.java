package com.momo.common.vo.aligo.alimtalk.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AlimTalkMsgResponseVO extends AlimTalkResponseVO {
    // alimtalk/send
    private String type; // AT
    private String mid; // 메세지 ID
    private Float current; // 포인트
    private Float unit; // 개별전송단가
    private Float total; // 전체전송단가
    private Integer scnt; // 전송 성공한 연락처 개수
    private Integer fcnt; // 전송 실패한 연락처 개수

    // history/list
    private List<AlimTalkMsgResultItem> list;
    private Integer currentPage;
    private Integer totalPage;
    private Integer totalCount;
}
