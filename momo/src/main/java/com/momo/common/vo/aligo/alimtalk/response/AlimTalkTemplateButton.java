package com.momo.common.vo.aligo.alimtalk.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AlimTalkTemplateButton {
    private String ordering;
    private String name;
    private String linkType;
    private String linkTypeName;
    private String linkMo;
    private String linkPc;
    private String linkIos;
    private String linkAnd;
}
