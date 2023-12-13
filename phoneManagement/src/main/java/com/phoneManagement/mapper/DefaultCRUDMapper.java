package com.phoneManagement.mapper;

import java.util.List;

public interface DefaultCRUDMapper<T, K> {
	public int insert(K key);
//	public T select(K key);
	public int update(K key);
	public int delete(K key);
	public List<T> search(K key);
	public List<T> selectAll();
}
