package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class VisitedShopVO extends BaseVO {
    private Integer vsId;

    private Double lat;
    private Double lng;
    private String shopAddr;
    private String shopNm;
    private Boolean canParking;
    private Integer visitedCnt;

    private String mgrNm;
    private String mgrTel;
    private String mgrRole;

    private String sellerId;
    private String sellerNm;

    private String memo;

}
