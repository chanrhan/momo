package com.momo.job;

import com.momo.common.vo.MessageVO;
import com.momo.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

// 주기적으로 알림톡 보내는 Job 클래스
// 근데 알림톡 API는 예약 문자도 지원하기 때문에 필요 없어졌다.
@RequiredArgsConstructor
@Slf4j
@Component
@Deprecated
public class SendKakaoBizTalkJob implements Job {

	private final MessageService messageService;

	@Override
	public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
		log.info("Send Kakao Biz Talk Job is processing!");

		List<Map<String,String>> todayReserved = messageService.getTodayReservedMsg();

		if(!todayReserved.isEmpty()){
			for(Map<String,String> map : todayReserved){
				try{
					String custTel = map.get("cust_tel");
					String custNm = map.get("cust_nm");
					String shopNm = map.get("shop_nm");
					String rsvDt = map.get("rsv_dt");
					Integer shopId = Integer.parseInt(map.get("shop_id"));
					Integer saleId = Integer.parseInt(map.get("sale_id"));
					Integer msgId = Integer.parseInt(map.get("msg_id"));

					MessageVO vo = MessageVO.builder()
							.shopId(shopId)
							.shopNm(shopNm)
							.saleId(saleId)
							.msgId(msgId)
							.rsvDt(rsvDt)
							.custTel(custTel)
							.custNm(custNm)
							.shopNm(shopNm)
							.build();

					messageService.sendMessage(vo);
				}catch (NullPointerException e){
					e.printStackTrace();
				}
            }
		}
	}
}
