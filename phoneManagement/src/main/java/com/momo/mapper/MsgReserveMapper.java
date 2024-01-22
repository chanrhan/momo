package com.momo.mapper;

import com.momo.service.DefaultCRUDService;
import com.momo.vo.MessageVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MsgReserveMapper extends DefaultCRUDService<MessageVO, MessageVO> {
	public int getMaxMsgId(int shopCd);
}
