package com.momo.mapper;

import com.momo.common.vo.ChatVO;
import com.momo.common.vo.VisitedShopVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface VisitedShopMapper {
	public void insertVisitedShop(VisitedShopVO vo);
	public List<Map<String,Object>> getVisitedShopList(VisitedShopVO vo);
}
