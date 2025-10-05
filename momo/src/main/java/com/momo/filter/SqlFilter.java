package com.momo.filter;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.filter.Filter;
import ch.qos.logback.core.spi.FilterReply;
import lombok.Getter;
import java.util.Arrays;
import java.util.List;


@Getter
public class SqlFilter extends Filter<ILoggingEvent> {
    private List<String> keywords;
    private String classToIgnore;

    public void setKeywords(String keywords) {
        this.keywords = Arrays.asList(keywords.split(","));
    }
//    public void setClassToIgnore(String classToIgnore) {
//        this.classToIgnore = classToIgnore;
//    }

	@Override
	public FilterReply decide(ILoggingEvent event) {
        // 특정 클래스의 로그를 무시
        if (classToIgnore != null && event.getLoggerName().startsWith(classToIgnore)) {
            return FilterReply.DENY;
        }

        // 키워드가 포함된 로그만 허용
        if (keywords != null) {
            for (String keyword : keywords) {
                if (event.getMessage().contains(keyword)) {
                    return FilterReply.DENY;
                }
            }
        }
/*        if (event.getMessage().contains(keyword)) { // 로그 이벤트의 메시지에 필터링할 문자열이 포함되어 있다면
            return FilterReply.DENY; // 거부
        } else {
            return FilterReply.ACCEPT; // 승인
        }*/
        return FilterReply.NEUTRAL;
	}
}
