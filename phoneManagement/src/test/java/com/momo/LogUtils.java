package com.momo;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.momo.common.vo.SaleVO;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class LogUtils {
    private static final ObjectMapper mapper = new ObjectMapper();

    /**
     * 실제 덮어쓸 JSON 파일의 경로
     * 프로젝트 루트 기준 상대경로 혹은 절대경로를 지정하세요.
     * 예: "data/sales.json", "/etc/app/logs/sales.json" 등
     */
    private static final String LOG_FILE_PATH = "sale_log.json";

    /**
     * 리소스(classpath)에서 읽기 전용으로 로드하고 싶다면 이 메서드를 쓰세요.
     * (JSON 내부를 수정할 수는 없습니다.)
     */
    public static List<SaleVO> readLogsFromResource(String resourcePath) throws IOException {
        try (InputStream is = LogUtils.class.getClassLoader().getResourceAsStream(resourcePath)) {
            if (is == null) {
                return new ArrayList<>();
            }
            return mapper.readValue(is, new TypeReference<List<SaleVO>>() {});
        }
    }

    /**
     * 파일 시스템상의 JSON 파일을 읽어서 List<SaleVO> 로 반환.
     * 파일이 없거나 비어있으면 빈 리스트를 반환합니다.
     */
    public static <T> List<T> readLogs(File jsonFile) throws IOException {
        if (!jsonFile.exists() || jsonFile.length() == 0) {
            System.out.println("[log] no file");
            return new ArrayList<>();
        }
        System.out.println("[log] can read");

        return mapper.readValue(jsonFile, new TypeReference<List<T>>() {});
    }

    /**
     * 새 SaleVO 엔트리를 추가한 뒤 JSON 파일에 덮어쓰기.
     */
    public static void addLog(SaleVO newEntry)  {
        try{
            // 1) JSON 파일 객체 생성
            File jsonFile = new File(LOG_FILE_PATH);

            // 2) 기존 로그 읽어오기 (없으면 빈 리스트)
            List<SaleVO> logs = readLogs(jsonFile);

            // 3) 새 엔트리 추가
            logs.add(newEntry);

            // 4) 사람이 읽기 좋은 형태로 덮어쓰기
            mapper
                    .writerWithDefaultPrettyPrinter()
                    .writeValue(jsonFile, logs);
        }catch (IOException e){
            e.printStackTrace();
        }

    }

    public static <T> void addLogAll(List<T> newEntry)  {
        try{
            // 1) JSON 파일 객체 생성
            File jsonFile = new File(LOG_FILE_PATH);

            // 2) 기존 로그 읽어오기 (없으면 빈 리스트)
            List<T> logs = readLogs(jsonFile);

            System.out.println("[log] Read File: " + logs);


            // 3) 새 엔트리 추가
            logs.addAll(newEntry);

            // 4) 사람이 읽기 좋은 형태로 덮어쓰기
            mapper
                    .writerWithDefaultPrettyPrinter()
                    .writeValue(jsonFile, logs);
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}
