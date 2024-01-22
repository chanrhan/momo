package com.momo.mapper;

import com.momo.service.DefaultCRUDService;
import com.momo.vo.MessageVO;
import com.momo.vo.MsgRegexVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MsgRegexMapper extends DefaultCRUDService<MsgRegexVO, MsgRegexVO> {
	public MsgRegexVO getRegex(int formId, int regexId);
}
