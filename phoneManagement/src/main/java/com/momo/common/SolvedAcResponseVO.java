package com.momo.common;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.momo.common.enums.SolvedAcResultType;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@SuperBuilder
public class SolvedAcResponseVO {
    private String username;
    private Integer resultId;
    private int problemId;
    private LocalDate date;
    private int submitId;


//    public SolvedAcResponseVO(SolvedAcResultType resultType, LocalDate dateTime) {
//        this.date = dateTime;
//        this.resultType = resultType;
//    }
}
