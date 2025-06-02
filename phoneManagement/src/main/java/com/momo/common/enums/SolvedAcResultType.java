package com.momo.common.enums;


import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public enum SolvedAcResultType {
    ALL(-1, "전체 결과"),
    CORRECT(4, "맞았습니다!!"),
    ERR_FORMAT(5, "출력 형식이 잘못되었습니다"),
    WRONG(6, "틀렸습니다"),
    ERR_TIMEOUT(7, "시간 초과"),
    ERR_MEMORY(8, "메모리 초과"),
    ERR_PRINT(9, "출력 초과"),
    ERR_RUNTIME(10, "런타임 에러"),
    ERR_COMPILE(11, "컴파일 에러");

    private final int status;
    private final String message;

    SolvedAcResultType(int status, String message) {
        this.status = status;
        this.message = message;
    }

//    public static SolvedAcResultType of(String resultMessage){
//        if(resultMessage.equals("맞았습니다!!")){
//            return SolvedAcResultType.CORRECT;
//        }else if(resultMessage.equals("틀렸습니다")){
//            return SolvedAcResultType.WRONG;
//        }else{
//            return SolvedAcResultType.ERROR;
//        }
//    }
}
