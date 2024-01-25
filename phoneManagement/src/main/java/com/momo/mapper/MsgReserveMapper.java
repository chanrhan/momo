package com.momo.mapper;

import com.momo.service.DefaultCRUDService;
import com.momo.vo.MessageVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MsgReserveMapper extends DefaultCRUDMapper<MessageVO, MessageVO> {
	public int getMaxMsgId(int shopCd);
	public List<MessageVO> getReservedMessageByBno(String bNo);
}
