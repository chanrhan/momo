package com.momo.mapper;

import com.momo.service.ICRUDService;
import com.momo.vo.MsgRegexVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MsgRegexMapper extends ICRUDService {
	public MsgRegexVO getRegex(int formId, int regexId);
}
