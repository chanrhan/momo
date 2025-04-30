package com.momo.common.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
public class LogVO {
    private Integer shopId;
    private Integer provider;
    private String actvDt;
    private String sellerId;
    private String custNm;
    private String custCd;
    private Integer custGd;
    private Integer deviceId;
    private Integer ctActvTp;
    private Integer ctIstm;
    private Integer totalCms;
    private Integer wtActvTp;
    private Integer wtCms;
    private Integer sdId;
    private Integer udId;
}
