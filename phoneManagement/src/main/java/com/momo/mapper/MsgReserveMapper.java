package com.momo.mapper;

import com.momo.vo.MessageVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MsgReserveMapper extends ICommonMapper<MessageVO,MessageVO> {
	public int getMaxMsgId(int shopCd);
	public List<MessageVO> selectByBNo(String bNo);
	public List<MessageVO> selectByShopCode(String shopCd);
}
