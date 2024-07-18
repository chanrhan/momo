package com.momo.mapper;

import com.momo.common.vo.MsgCommonVO;
import com.momo.common.vo.ReserveMessageVO;
import com.momo.common.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReserveMsgMapper {
	// Message Reserve
	public int insertMsg(ReserveMessageVO vo);
	public int updateMsg(ReserveMessageVO vo);
	public int deleteMsg(int id);
}
