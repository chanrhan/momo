package com.momo.utils;

import java.time.*;

public class TimeUtils {
    public static LocalDateTime parseTimestamp(long timestamp){
        Instant instantUtc = Instant.ofEpochSecond(timestamp);
        return instantUtc.atZone(ZoneId.of("Asia/Seoul")).toLocalDateTime();
    }
}
