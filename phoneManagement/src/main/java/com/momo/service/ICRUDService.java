package com.momo.service;

import com.momo.vo.CommonVO;

import java.util.List;
import java.util.Map;

public interface ICRUDService {
	public int insert(Map<String,Object> map);
	public int update(Map<String,Object> map);
	public int delete(Map<String,Object> map);
	public List<Map<String,Object>> select(Map<String,Object> map);
	public List<Map<String,Object>> search(CommonVO commonVO);
	public Map<String,Object> selectOne(Map<String,Object> map);
	public List<Map<String,Object>> selectAll();
}
