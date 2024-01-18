package com.momo.mapper;

import com.momo.vo.CorpVO;
import com.momo.vo.RegionVO;
import com.momo.vo.ShopVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CorpMapper extends DefaultCRUDMapper<ShopVO, ShopVO> {
}
