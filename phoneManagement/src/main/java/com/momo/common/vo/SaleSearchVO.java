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
public class SaleSearchVO extends BaseVO {
    private String userId;
    private Integer saleId;
    private Integer category;
    private Integer currShopId;

    private String keyword;
    private String keydate;
    private Integer order;
    private boolean asc = false;
    private Boolean notDone;
//    private int[] columns = {1,2,3,4,5,6,7,8,9};
    private SaleSearchFilter[] filters;

//    private Integer[] columns;

    @Data
    @NoArgsConstructor
    private static class SaleSearchFilter{
        private boolean and = false;
        private Integer type ;
        private Integer option;
        private Integer target;
    }

    private static String[] COLUMNS = {
        "main_div","actv_dt","cust_nm","cust_tel","cust_cd","device_nm","total_cms","seller_nm"
    };

    private static String[] TYPES = {
      "device_id","sd_id","ct_actv_plan"
    };

    private static String[] CONDITIONS = {
            " = ",
            " != ",
            " is null ",
            " is not null "
    };
    public String getAsc(){
        return asc ? "asc":"desc";
    }

    private String generateClause(SaleSearchFilter filter){
        StringBuilder sb = new StringBuilder();
        sb.append(TYPES[filter.type]).append(CONDITIONS[filter.option]).append(filter.target);
        return sb.toString();
    }

    public String getOrder(){
        return order != null ? COLUMNS[order] : null;
    }

    public String getFilters(){
        if(filters == null || filters.length == 0){
            return null;
        }
        StringBuilder sb = new StringBuilder();
        sb.append(generateClause(filters[0]));
        for(int i=1;i<filters.length;++i){
            sb.append(filters[i].and ? " and " : " or ")
                    .append(generateClause(filters[i])).append(" ");
        }
        sb.append(" and ");

        return sb.toString();
    }
}
