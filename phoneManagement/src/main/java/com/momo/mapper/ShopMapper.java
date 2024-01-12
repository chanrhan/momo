package com.momo.mapper;

import com.momo.vo.RegionVO;
import com.momo.vo.ShopVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ShopMapper extends DefaultCRUDMapper<ShopVO, ShopVO> {
	public Integer getMaxCode();
	public List<ShopVO> searchByRegion(RegionVO regionVO);
	public int getTotalRecordCount(ShopVO shopVO);
}
