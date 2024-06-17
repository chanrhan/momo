package com.momo.mapper;

import com.momo.common.vo.GMDVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

// Global Master Data
@Mapper
public interface GMDMapper {
    public List<Map<String,String >> getPhoneModel();
    public List<Map<String,Object>> getDevice(String keyword);
    public List<Map<String,Object>> getExtraService(String keyword);
}
