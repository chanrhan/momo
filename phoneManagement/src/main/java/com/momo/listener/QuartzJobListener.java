package com.momo.listener;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobListener;

public class QuartzJobListener implements JobListener {
	@Override
	public String getName() {
		return this.getClass().getName();
	}

	@Override
	public void jobToBeExecuted(JobExecutionContext jobExecutionContext) {

	}

	@Override
	public void jobExecutionVetoed(JobExecutionContext jobExecutionContext) {

	}

	@Override
	public void jobWasExecuted(JobExecutionContext jobExecutionContext, JobExecutionException e) {

	}
}
