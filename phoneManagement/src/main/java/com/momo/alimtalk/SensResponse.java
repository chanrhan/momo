package com.momo.alimtalk;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Objects;

@Data
@SuperBuilder
@NoArgsConstructor
public class SensResponse {
    private static String SUCCESS_STATUS_CODE = "202";

    private String requestId;
    private String requestTime;
    private String statusCode;
    private String statusName;

    public boolean isSuccess(){
        return Objects.equals(statusCode, SUCCESS_STATUS_CODE);
    }
}
