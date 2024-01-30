package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MsgRegexMapper extends ICRUDService {
	public MsgRegexVO getRegex(int formId, int regexId);
}
