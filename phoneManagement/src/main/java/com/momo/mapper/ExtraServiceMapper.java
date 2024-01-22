package com.momo.mapper;

import com.momo.vo.ExtraServiceVO;
import com.momo.vo.PlanVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface ExtraServiceMapper extends DefaultCRUDMapper<ExtraServiceVO, ExtraServiceVO> {
	public Map<String,String> getByMap(int exSvcId);
}
