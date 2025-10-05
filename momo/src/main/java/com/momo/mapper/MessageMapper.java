package com.momo.mapper;

import com.momo.common.vo.MessageVO;
import com.momo.common.vo.SaleVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MessageMapper {
	// Message Reserve
	public int insertMessageHistory(MessageVO vo);
	public void insertMessageHistoryMany(List<MessageVO> vo);
	public int deleteMessageList(List<MessageVO> list);

	public List<Map<String,Object>> getReserveMsgBySale(SaleVO vo);

	public List<String> getReserveMsgForCalendar(int currShopId, String date);

	public List<Map<String,Object>> getReserveMsgDetail(int currShopId, String date);
	public Map<String,Object> getReserveMsgAll(MessageVO vo);
	public List<Map<String,String>> getTodayReservedMsg();
	public int updateMessageSendState(MessageVO vo);

	// Alimtalk Template
	public void insertAlimtalkTemplate(MessageVO vo);
	public int updateAlimtalkTemplate(MessageVO vo);
	public int deleteAlimtalkTemplate(MessageVO vo);
	public String getAlimtalkTemplateCode(int tplId);
	public List<Map<String,Object>> getAlimtalkTemplateList(MessageVO vo);
}