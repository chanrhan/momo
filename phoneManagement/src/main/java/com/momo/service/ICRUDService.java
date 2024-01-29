package com.momo.service;

import com.momo.vo.CommonVO;

import java.util.List;
import java.util.Map;

public interface ICRUDService<T,K> {
	public int insert(K key);
	public int update(K key);
	public int delete(K key);
	public List<T> select(K key);
	public List<T> search(CommonVO commonVO);
	public T selectOne(K key);
	public List<T> selectAll();
}
