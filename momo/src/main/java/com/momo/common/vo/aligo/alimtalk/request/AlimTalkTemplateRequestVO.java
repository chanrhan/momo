package com.momo.common.vo.aligo.alimtalk.request;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@SuperBuilder
public class AlimTalkTemplateRequestVO extends AlimTalkRequestVO {
    private String apikey;
    private String userid;

    // template/list
//    private String senderKey; // 발신프로필 키
//    private String senderkey; // 발신프로킬 키..
    private String tplCode; // 템플릿 코드

    // template/add
    private String tplName;
    private String tplContent;
    private String tplSecure;
    private String tplType;
    private String tplEmtype;
    private String tplAdvert;
    private String tplExtra;
    private String tplTitle;
    private String tplStitle;
    private String image;
    private List<TemplateButton> tplButton;

    @Data
    @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class TemplateButton{
        private String name;
        private String linkType;
        private String linkM;
        private String linkP;
        private String linkI;
        private String linkA;
    }

}
