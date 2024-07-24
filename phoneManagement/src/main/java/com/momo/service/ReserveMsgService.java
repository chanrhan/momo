package com.momo.service;

import com.momo.common.vo.ReserveMessageVO;
import com.momo.mapper.ReserveMsgMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReserveMsgService extends CommonService {
	private final ReserveMsgMapper reserveMsgMapper;

    public void insertMsgList(String userId, int saleId, List<ReserveMessageVO> list){
		for(ReserveMessageVO vo : list){
			vo.setUserId(userId);
			vo.setSaleId(saleId);
			reserveMsgMapper.insertMsg(vo);
		}
	}

	public List<Map<String,Integer>> getReserveMsgForCalendar(String userId, String date){
		return reserveMsgMapper.getReserveMsgForCalendar(userId,date);
	}

	public List<Map<String ,Object>> getReserveMsgDetail(String userId, String date, int state){
		return reserveMsgMapper.getReserveMsgDetail(userId, date, state);
	}
}
