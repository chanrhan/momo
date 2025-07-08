package com.momo.job;

import com.momo.common.vo.ReserveMessageVO;
import com.momo.service.ReserveMsgService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

// 휴면 회원 관리
@RequiredArgsConstructor
@Slf4j
@Component
public class SendKakaoBizTalkJob implements Job {

	private final ReserveMsgService reserveMsgService;

	@Override
	public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
		log.info("Send Kakao Biz Talk Job is processing!");

		List<Map<String,String>> todayReserved = reserveMsgService.getTodayReservedMsg();

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

					ReserveMessageVO vo = ReserveMessageVO.builder()
							.shopId(shopId)
							.shopNm(shopNm)
							.saleId(saleId)
							.msgId(msgId)
							.rsvDt(rsvDt)
							.custTel(custTel)
							.custNm(custNm)
							.shopNm(shopNm)
							.build();

					reserveMsgService.sendMessage(vo);
				}catch (NullPointerException e){
					e.printStackTrace();
				}
            }
		}
	}
}
