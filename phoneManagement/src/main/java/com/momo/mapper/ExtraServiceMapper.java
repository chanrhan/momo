package com.momo.mapper;

import com.momo.vo.ExtraServiceVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface ExtraServiceMapper extends ICommonMapper<ExtraServiceVO,ExtraServiceVO> {
	public ExtraServiceVO getByMap(int exSvcId);
}
