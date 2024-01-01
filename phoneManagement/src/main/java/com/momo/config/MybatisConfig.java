package com.momo.config;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@RequiredArgsConstructor
public class MybatisConfig {
	private final ApplicationContext applicationContext;
//	@Bean
//	public SqlSessionFactory mainSqlSessionFactory(@Qualifier("main")DataSource dataSource) throws Exception{
//		SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
//		sessionFactoryBean.setDataSource(dataSource);
//		sessionFactoryBean.setTypeAliasesPackage("com.momo.vo");
//		sessionFactoryBean.setConfigLocation(applicationContext.getResource("classpath:mybatis-config.xml"));
//		sessionFactoryBean.setMapperLocations(applicationContext.getResource("classpath:mapper/*.xml"));
//		return sessionFactoryBean.getObject();
//	}
}
