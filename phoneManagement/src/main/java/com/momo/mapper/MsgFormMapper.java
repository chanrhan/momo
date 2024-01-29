package com.momo.mapper;

import com.momo.service.ICRUDService;
import com.momo.vo.MessageVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MsgFormMapper extends ICRUDService<MessageVO,MessageVO> {
	public List<MessageVO> getAllDefaultForm();
	public MessageVO selectDefaultForm(int formId);
	public MessageVO selectForm(int formId);
}
