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
    private Boolean completed;
//    private int[] columns = {1,2,3,4,5,6,7,8,9};
    private SaleSearchFilter[] filters;

    private static class SaleSearchFilter{
        private boolean and = false;
        private Integer item;
        private Integer condition;
        private Integer target;
    }

    private static String[] COLUMNS = {
        "actv_dt","cust_nm","cust_tel","cust_cd","device_nm","total_cms","seller_nm"
    };

    private static String[] CONDITIONS = {
            " is ",
            " is not ",
            " is null ",
            " is not null "
    };
    public String getAsc(){
        return asc ? "asc":"desc";
    }

    private String generateClause(SaleSearchFilter filter){
        StringBuilder sb = new StringBuilder();
        sb.append(filter.item).append(CONDITIONS[filter.condition]).append(filter.target);
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

        return sb.toString();
    }
}
