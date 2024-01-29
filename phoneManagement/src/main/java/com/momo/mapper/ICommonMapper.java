package com.momo.mapper;

import com.momo.vo.CommonVO;

import java.util.List;
import java.util.Map;

public interface ICommonMapper {
	public int insert(Map<String,Object> map);
	public int update(Map<String,Object> map);
	public int delete(Map<String,Object> map);
	public List<Map<String,Object>> select(String qs);
	public List<Map<String,Object>> search(CommonVO commonVO);
	public List<Map<String,Object>> selectAll();
}
