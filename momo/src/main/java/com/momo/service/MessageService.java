package com.momo.service;

import com.momo.extern_api.SENSUtil;
import com.momo.alimtalk.SensResponse;
import com.momo.common.vo.MessageVO;
import com.momo.common.vo.SaleVO;
import com.momo.mapper.MessageMapper;
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
public class MessageService {
	private static final Logger log = LoggerFactory.getLogger(MessageService.class);
	private final MessageMapper messageMapper;
	private final SaleMapper saleMapper;

	private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	private final AligoService aligoService;
//	private static final DateTimeFormatter requestTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

	@Transactional
    public void insertMsgList(SaleVO vo){
//		List<Integer> todaySendList = new ArrayList<>();
		LocalDate today = LocalDate.now();
		String todayDateFormatted = today.format(dateTimeFormatter);

		List<MessageVO> list = vo.getRsvMsgList();
		int saleId = vo.getSaleId();
		int currShopId = vo.getCurrShopId();
		String custNm = vo.getCustNm();
		String custTel = vo.getCustTel();

		if(Objects.isNull(custNm) || Objects.isNull(custTel)){
			Map<String,Object> map = saleMapper.getCustomerInfoBySaleId(currShopId, saleId);

			try{
				custNm = map.get("cust_nm").toString();
				custTel = map.get("cust_tel").toString();
			}catch (NullPointerException e){
				throw new NullPointerException("Customer Name and Telephone Number is Null!");

			}

			custTel = custTel.replace("-", "");
		}


		for(int i=0;i<list.size();++i){
			MessageVO rsvVo = list.get(i);
			rsvVo.setSaleId(saleId);
			rsvVo.setCurrShopId(currShopId);
			rsvVo.setShopId(currShopId);
			rsvVo.setCustNm(custNm);
			rsvVo.setCustTel(custTel);
			int msgId = messageMapper.insertMessageHistory(rsvVo);
			rsvVo.setMsgId(msgId);
			sendMessage(rsvVo);
		}
	}

	public boolean deleteMsgList(List<MessageVO> list){
//		for(ReserveMessageVO vo : list){
////			vo.setSaleId(saleId);
////			vo.setCurrShopId(currShopId);
//			result += reserveMsgMapper.deleteMsg(list);
//		}
		int result = messageMapper.deleteMessageList(list);
		return result == list.size();
	}

	public List<Map<String,Object>> getReserveMsgBySale(SaleVO vo){
		return messageMapper.getReserveMsgBySale(vo);
	}

	public List<String> getReserveMsgForCalendar(int currShopId, String date){
		return messageMapper.getReserveMsgForCalendar(currShopId,date);
	}

	public List<Map<String ,Object>> getReserveMsgDetail(int currShopId, String date){
		return messageMapper.getReserveMsgDetail(currShopId, date);
	}
	public Map<String ,Object> getReserveMsgAll(MessageVO vo){
		return messageMapper.getReserveMsgAll(vo);
	}

	public List<Map<String,String>> getTodayReservedMsg(){
		return messageMapper.getTodayReservedMsg();
	}

	public int updateMessageSendState(MessageVO vo){
		return messageMapper.updateMessageSendState(vo);
	}


	public void sendMessage(MessageVO vo) {
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

	public void insertAlimtalkTemplate(MessageVO vo){
		vo.setContent("");
		messageMapper.insertAlimtalkTemplate(vo);
	}

	public int updateAlimtalkTemplate(MessageVO vo){
		return messageMapper.updateAlimtalkTemplate(vo);
	}

	public int updateTemplateContent(MessageVO vo){
		return messageMapper.updateAlimtalkTemplate(vo);
	}

	public int deleteAlimtalkTemplate(MessageVO vo){
		return messageMapper.deleteAlimtalkTemplate(vo);
	}

	public List<Map<String,Object>> getAlimtalkTemplateList(MessageVO vo){
		return messageMapper.getAlimtalkTemplateList(vo);
	}

	public List<Map<String,Object>> getAlimtalkTemplateListAll(String keyword){
		return messageMapper.getAlimtalkTemplateListAll(keyword);
	}
}
