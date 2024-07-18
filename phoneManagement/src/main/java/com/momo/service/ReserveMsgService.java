package com.momo.service;

import com.momo.common.vo.ReserveMessageVO;
import com.momo.mapper.ReserveMsgMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
