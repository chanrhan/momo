package com.momo.mapper;

import com.momo.vo.AlarmVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AlarmMapper extends DefaultCRUDMapper<AlarmVO, AlarmVO> {
	public List<AlarmVO> selectByReceiver(String receiver);
}
