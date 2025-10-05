package com.momo.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.net.URLDecoder;

@Component
@Deprecated
public class PlusSymbolInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String query = request.getQueryString();
        if (query != null) {
            String decodedQuery = URLDecoder.decode(query, "UTF-8").replace("+", "%2B");
            request.setAttribute("decodedQuery", decodedQuery);
        }
        return true;
    }
}
