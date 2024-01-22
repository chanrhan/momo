package com.momo.mapper;

import com.momo.service.DefaultCRUDService;
import com.momo.vo.MessageVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MsgFormMapper extends DefaultCRUDService<MessageVO, MessageVO> {
	public List<MessageVO> getAllDefaultForm();
	public MessageVO selectDefaultForm(int formId);
	public MessageVO selectForm(int formId);
}
