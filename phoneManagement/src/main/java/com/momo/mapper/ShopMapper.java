package com.momo.mapper;

import com.momo.vo.ShopVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ShopMapper extends ICommonMapper<ShopVO,ShopVO> {
	public Integer getMaxCode();
	public List<ShopVO> searchByRegion(ShopVO shopVO);
}
