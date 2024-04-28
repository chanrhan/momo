package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class GMDVO extends CommonQueryVO{
    // Device
    private String deviceMd;
    private String deviceNm;


    // Extra Service
    private Integer exsvcId;
    private String exsvcNm;

    // Plan
    private Integer planId;
    private Integer planNm;


    private LocalDate regiDt;
}
