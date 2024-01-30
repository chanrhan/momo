package com.momo.mapper;

import com.momo.vo.SearchVO;

import java.util.List;
import java.util.Map;

public interface ICommonMapper {
	public int insert(Map<String,Object> map);
	public int update(Map<String,Object> map);
	public int delete(Map<String,Object> map);
	public List<Map<String,Object>> select(String qs);
	public List<Map<String,Object>> search(SearchVO searchVO);
	public List<Map<String,Object>> selectAll();
}
