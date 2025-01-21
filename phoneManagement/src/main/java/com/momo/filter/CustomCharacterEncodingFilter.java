package com.momo.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

@Component
public class CustomCharacterEncodingFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (request instanceof HttpServletRequest) {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            Map<String, String[]> params = httpRequest.getParameterMap();

            for (Map.Entry<String, String[]> entry : params.entrySet()) {
                String[] values = entry.getValue();
                for (int i = 0; i < values.length; i++) {
                    try {
                        // "+"가 공백이 되지 않도록 직접 디코딩
                        values[i] = URLDecoder.decode(values[i], "UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        throw new ServletException("Encoding not supported", e);
                    }
                }
            }
        }
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
