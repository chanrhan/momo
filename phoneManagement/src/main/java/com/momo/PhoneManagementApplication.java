package com.momo;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@ServletComponentScan // 필터 클래스에 @Component 붙이지 않아도 자동으로 필터 스캔해주는 어노테이션
					  // 하지만 대신 @WebFilter라는 어노테이션을 붙여줘야 함
public class PhoneManagementApplication {

	public static void main(String[] args) throws SchedulerException {
		SpringApplication.run(PhoneManagementApplication.class, args);

//		JobDetail job = JobBuilder.newJob(MyJob.class)
//				.withIdentity("myJob","group1")
//				.build();
//
//		Trigger trigger = TriggerBuilder.newTrigger()
//				.withIdentity("myTrigger","group1")
//				.startNow()
//				.withSchedule(SimpleScheduleBuilder.simpleSchedule()
//									  .withIntervalInSeconds(10)
//									  .repeatForever())
//				.build();
//
//		Scheduler scheduler = new StdSchedulerFactory().getScheduler();
//		scheduler.start();
//		scheduler.scheduleJob(job, trigger);
	}

}

//class MyJob implements Job {
//	public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
//		System.out.println("Test Quartz!");
//	}
//}
