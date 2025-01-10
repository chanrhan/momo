package com.momo.service;

import com.momo.common.vo.ReserveMessageVO;
import com.momo.common.vo.SaleVO;
import com.momo.mapper.ReserveMsgMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReserveMsgService {
	private final ReserveMsgMapper reserveMsgMapper;

    public void insertMsgList(int currShopId, int saleId, List<ReserveMessageVO> list){
		for(ReserveMessageVO vo : list){
			vo.setSaleId(saleId);
			vo.setCurrShopId(currShopId);
			reserveMsgMapper.insertMsg(vo);
		}
	}

	public boolean deleteMsgList(int currShopId, int saleId, List<ReserveMessageVO> list){
		int result = 0;
		for(ReserveMessageVO vo : list){
			vo.setSaleId(saleId);
			vo.setCurrShopId(currShopId);
			result += reserveMsgMapper.deleteMsg(vo);
		}
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
}
