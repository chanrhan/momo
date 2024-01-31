package com.momo.mapper;

import com.momo.vo.MsgCommonVO;
import com.momo.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MsgCommonMapper {
	public List<Map<String,Object>> getAllDefaultForm();
	// Message Form
	public int insertMsgForm(MsgCommonVO vo);
	public int updateMsgForm(String qs);
	public int deleteMsgForm(int id);
	public List<Map<String,Object>> selectMsgForm(String qs);
	public List<Map<String,Object>> searchMsgForm(SearchVO vo);
//	public List<Map<String,Object>> getAllDefaultForm();
//	public Map<String,Object> selectDefaultForm(int formId);
//	public Map<String,Object> selectForm(int formId);

	// Message Reserve
	public int insertMsgReserve(MsgCommonVO vo);
	public int updateMsgReserve(String qs);
	public int deleteMsgReserve(int id);
	public List<Map<String,Object>> selectMsgReserve(String qs);
	public List<Map<String,Object>> searchMsgReserve(SearchVO vo);
	public int getMaxMsgReserveId();
}
