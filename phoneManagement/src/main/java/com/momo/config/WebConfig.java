package com.momo.config;

import com.momo.interceptor.ApprovalInterceptor;
import com.momo.interceptor.RoleAuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:8080") // 안에 해당 주소를 넣어도 됨
				.allowedMethods("GET", "POST")
				.allowedHeaders("*")
				.allowCredentials(true)
				.maxAge(3000);
		//.allowCredentials(true); // .allowedOriginPatterns("*") 이렇게 와일드 카드로 설정하면 이거 쓰면 에러남 ( 실행 조차  X )
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
//		registry.addInterceptor(new ApprovalInterceptor())
//				.addPathPatterns("/**")
//				.excludePathPatterns("/error-page/**","/js/**","/css/**","/api/**");

		registry.addInterceptor(new RoleAuthInterceptor())
				.addPathPatterns("/**")
				.excludePathPatterns("/error-page/**","/js/**","/css/**","/api/**");
	}

	// 아래의 방식 대신 @WebFilter를 사용해서 필터를 거는 방식도 사용할 수 있음
//	@Bean
//	public FilterRegistrationBean<TestFilter> setFilterRegistration(){
//		FilterRegistrationBean<TestFilter> filterRegistrationBean = new FilterRegistrationBean<>(new TestFilter());
//		filterRegistrationBean.addUrlPatterns("/test/*");
//		return filterRegistrationBean;
//	}
}
