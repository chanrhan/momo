package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MsgReserveMapper extends ICommonMapper {
	public int getMaxMsgId(int shopCd);
	public List<Map<String,Object>> selectByBNo(String bNo);
	public List<Map<String,Object>> selectByShopCode(String shopCd);
}
