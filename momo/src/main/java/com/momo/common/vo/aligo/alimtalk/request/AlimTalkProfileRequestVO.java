package com.momo.common.vo.aligo.alimtalk.request;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AlimTalkProfileRequestVO extends AlimTalkRequestVO {
    private String apikey;
    private String userid;

    // profile/auth
    // API 토큰 생성
    private String plusid; // 카카오채널 아이디(@포함)
    private String phonenumber; // 카카오채널 알림받는 관리자 핸드폰 번호

    // profile/add
    private String authnum; // 발신프로필 인증번호
    private String categorycode; // 발신프로필의 카테고리 코드

}
