package com.momo.common.vo.aligo.alimtalk.response;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AlimTalkTemplateInfo {
    @JsonAlias("REG")
    private int REG;
    @JsonAlias("REQ")
    private int REQ;
    @JsonAlias("APR")
    private int APR;
    @JsonAlias("REJ")
    private int REJ;
}
