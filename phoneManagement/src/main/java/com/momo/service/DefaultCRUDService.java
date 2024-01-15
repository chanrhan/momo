package com.momo.service;

import java.util.List;

public interface DefaultCRUDService<T, K> {
	public int insert(K key);
	public List<T> select(K key);
	public int update(K key);
	public int delete(K key);
	public List<T> selectAll();
}
