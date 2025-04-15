package com.momo.service;

import com.momo.alimtalk.SENSUtil;
import com.momo.alimtalk.SensResponse;
import com.momo.common.vo.ReserveMessageVO;
import com.momo.common.vo.SaleVO;
import com.momo.mapper.ReserveMsgMapper;
import com.momo.mapper.SaleMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ReserveMsgService {
	private static final Logger log = LoggerFactory.getLogger(ReserveMsgService.class);
	private final ReserveMsgMapper reserveMsgMapper;
	private final SaleMapper saleMapper;

	private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	private static final DateTimeFormatter requestTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

	@Transactional
    public void insertMsgList(SaleVO vo){
		List<Integer> todaySendList = new ArrayList<>();
		LocalDate today = LocalDate.now();
		String todayDateFormatted = today.format(dateTimeFormatter);

		log.info("[SENS] formatted Today : {}", todayDateFormatted);

		List<ReserveMessageVO> list = vo.getRsvMsgList();
		int saleId = vo.getSaleId();
		int currShopId = vo.getCurrShopId();
		String custNm = vo.getCustNm();
		String custTel = vo.getCustTel();

		if(Objects.isNull(custNm) || Objects.isNull(custTel)){
			Map<String,String> map = saleMapper.getCustomerInfoBySaleId(currShopId, saleId);

			custNm = map.get("cust_nm");
			custTel = map.get("cust_tel");

			if(Objects.isNull(custNm) || Objects.isNull(custTel)){
				throw new NullPointerException("Customer Name and Telephone Number is Null!");
			}

			custTel = custTel.replace("-", "");
		}


		for(int i=0;i<list.size();++i){
			ReserveMessageVO rsvVo = list.get(i);
			rsvVo.setSaleId(saleId);
			rsvVo.setCurrShopId(currShopId);
			rsvVo.setShopId(currShopId);
			rsvVo.setCustNm(custNm);
			rsvVo.setCustTel(custTel);
			int msgId = reserveMsgMapper.insertMsg(rsvVo);
			rsvVo.setMsgId(msgId);
			sendMessage(rsvVo);
		}
	}

	public boolean deleteMsgList(List<ReserveMessageVO> list){
//		for(ReserveMessageVO vo : list){
////			vo.setSaleId(saleId);
////			vo.setCurrShopId(currShopId);
//			result += reserveMsgMapper.deleteMsg(list);
//		}
		int result = reserveMsgMapper.deleteMessageList(list);
		return result == list.size();
	}

	public List<Map<String,Object>> getReserveMsgBySale(SaleVO vo){
		return reserveMsgMapper.getReserveMsgBySale(vo);
	}

	public List<String> getReserveMsgForCalendar(int currShopId, String date){
		return reserveMsgMapper.getReserveMsgForCalendar(currShopId,date);
	}

	public List<Map<String ,Object>> getReserveMsgDetail(int currShopId, String date){
		return reserveMsgMapper.getReserveMsgDetail(currShopId, date);
	}
	public Map<String ,Object> getReserveMsgAll(ReserveMessageVO vo){
		return reserveMsgMapper.getReserveMsgAll(vo);
	}

	public List<Map<String,String>> getTodayReservedMsg(){
		return reserveMsgMapper.getTodayReservedMsg();
	}

	public int updateMessageSendState(ReserveMessageVO vo){
		return reserveMsgMapper.updateMessageSendState(vo);
	}


	public void sendMessage(ReserveMessageVO vo) {
		String reservedDate = vo.getRsvDt();
		vo.setRsvDt(reservedDate);


		Integer msgSt = 2; // Default: Error
		String requestId = null;
		String requestTime = null;

		try{
			log.info("[SENS] Send Message: {}", vo );
			ResponseEntity<SensResponse> res = SENSUtil.sendWithRestTemplate(vo);
			msgSt = Objects.requireNonNull(res.getBody()).isSuccess() ? 1: 2;
			requestId = res.getBody().getRequestId();
			requestTime = res.getBody().getRequestTime();

			log.info("[SENS] Send Status: {}", res);
		}catch (Exception e){
			e.printStackTrace();
		}

		vo.setReqId(requestId);
		vo.setReqDt(requestTime);
		vo.setMsgSt(msgSt);

		updateMessageSendState(vo);
	}
}
