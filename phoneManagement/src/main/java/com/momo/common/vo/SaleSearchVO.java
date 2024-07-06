package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import javassist.tools.rmi.StubGenerator;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class SaleSearchVO extends CommonQueryVO{
    private String userId;
    private String category;
    private String keyword;
    private LocalDate fromDate;
    private LocalDate toDate;
    private Integer order;
    private boolean asc = false;
//    private int[] columns = {1,2,3,4,5,6,7,8,9};
    private SaleSearchFilter[] filters;

    private static class SaleSearchFilter{
        private boolean and = false;
        private Integer item;
        private Integer condition;
        private Integer target;
    }

    private static String[] COLUMNS = {

    };

    private static String[] CONDITIONS = {
            " is ",
            " is not ",
            " is null ",
            " is not null "
    };

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
