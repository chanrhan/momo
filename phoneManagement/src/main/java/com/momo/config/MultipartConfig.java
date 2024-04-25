package com.momo.config;

import jakarta.servlet.MultipartConfigElement;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.StandardBeanInfoFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@Configuration
public class MultipartConfig  {
	// Spring Boot 에서는 Multipart Resolver를 따로 Bean으로 등록하지 않아도 자동으로 적용시켜준다고 한다./
    // 리액트+axios로 바꾸니 Multipart 데이터가 받아지질 않길래 다시 설정해본다
    // 다시 없앰


//
//    @Value("${file.multipart.maxUplaodSize}")
//    private long maxUploadSize;
//
//    @Value("${file.multipart.maxUploadSizePerFile}")
//    private long maxUploadSizePerFile;
//
//    @Bean
//    public MultipartResolver multipartResolver(){
//        StandardServletMultipartResolver multipartResolver = new StandardServletMultipartResolver();
//        return multipartResolver;
//    }
//
//    @Bean
//    public MultipartConfigElement multipartConfigElement(){
//        MultipartConfigFactory factory = new MultipartConfigFactory();
//        factory.setMaxRequestSize(DataSize.ofBytes(maxUploadSize));
//        factory.setMaxFileSize(DataSize.ofBytes(maxUploadSizePerFile));
//        return factory.createMultipartConfig();
//    }
}
