package com.momo.job;

import com.momo.service.UserCommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

// 휴면 회원 관리
@RequiredArgsConstructor
@Slf4j
@Component
public class DormantUserJob implements Job {
	private final UserCommonService userCommonService;

	@Override
	public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
		log.info("Dormant User Job is processing!");

		int result = userCommonService.findGhostUserAndUpdateToDormant(1);

	}
}
