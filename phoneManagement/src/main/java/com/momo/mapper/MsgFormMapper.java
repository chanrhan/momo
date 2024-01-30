package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MsgFormMapper extends ICRUDService {
	public List<Map<String,Object>> getAllDefaultForm();
	public Map<String,Object> selectDefaultForm(int formId);
	public Map<String,Object> selectForm(int formId);
}
