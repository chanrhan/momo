package com.momo.mapper;

import com.momo.common.vo.MsgCommonVO;
import com.momo.common.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MsgCommonMapper {
	public List<Map<String,Object>> getAllDefaultForm();
	// Message Form
	public int insertForm(MsgCommonVO vo);
	public int updateForm(MsgCommonVO vo);
	public int deleteForm(int id);
	public List<Map<String,Object>> selectForm(MsgCommonVO vo);
	public List<Map<String,Object>> searchForm(SearchVO vo);
//	public List<Map<String,Object>> getAllDefaultForm();
//	public Map<String,Object> selectDefaultForm(int formId);
//	public Map<String,Object> selectForm(int formId);

	// Message Reserve
	public int insertMsg(MsgCommonVO vo);
	public int updateMsg(MsgCommonVO vo);
	public int deleteMsg(int id);
	public List<Map<String,Object>> selectMsg(MsgCommonVO vo);
	public List<Map<String,Object>> searchMsg(SearchVO vo);
}
