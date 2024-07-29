package com.momo.mapper;

import com.momo.common.vo.GMDVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

// Global Master Data
@Mapper
public interface GMDMapper {
    // 정적 목록
    public List<Map<String,Object>> getDevice(String keyword, Integer provider);
    public List<Map<String,Object>> getSecondDevice(String keyword, Integer provider);
    public List<Map<String,Object>> getCtPlan(String keyword, Integer provider);

    // 동적 목록
    public List<Map<String,Object>> getExtraService(String userId, String keyword, Integer provider);
    public List<Map<String,Object>> getInternetPlan(String userId, String keyword, Integer provider);
    public List<Map<String,Object>> getTvPlan(String userId, String keyword, Integer provider);
    public List<Map<String,Object>> getComb(String userId, String keyword);
    public List<Map<String,Object>> getSupportDiv(String userId, String keyword);
    public List<Map<String,Object>> getAddDiv(String userId, String keyword);

    public Map<String,Object> getSecondDeviceById(int id);
}
