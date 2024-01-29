package com.momo.mapper;

import com.momo.vo.CommonVO;

import java.util.List;
import java.util.Map;

public interface ICommonMapper<T,K> {
	public int insert(K map);
	public int update(K map);
	public int delete(K map);
	public List<T> select(String qs);
	public List<T> search(CommonVO commonVO);
	public List<T> selectAll();
}
