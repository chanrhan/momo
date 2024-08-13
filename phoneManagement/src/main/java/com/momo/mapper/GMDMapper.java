package com.momo.mapper;

import com.momo.common.vo.CommonVO;
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

    public void insertDeviceAll(List<GMDVO> list);
    public void insertSecondDeviceAll(List<GMDVO> list);
    public void insertCtPlanAll(List<GMDVO> list);

    public void insertInternetPlanAll(int currShopId, List<GMDVO> list);
    public void insertTvPlanAll(int currShopId,List<GMDVO> list);
    public void insertExtraServiceAll(int currShopId,List<GMDVO> list);
    public void insertSupportDivAll(int currShopId,List<GMDVO> list);
    public void insertAddDivAll(int currShopId,List<GMDVO> list);
    public void insertCombAll(int currShopId,List<GMDVO> list);

    // 동적 목록
    public List<Map<String,Object>> getInternetPlan(int currShopId, String keyword, Integer provider);
    public List<Map<String,Object>> getTvPlan(int currShopId, String keyword, Integer provider);
    public List<Map<String,Object>> getExtraService(int currShopId, String keyword, Integer provider);
    public List<Map<String,Object>> getSupportDiv(int currShopId, String keyword);
    public List<Map<String,Object>> getAddDiv(int currShopId, String keyword);
    public List<Map<String,Object>> getComb(int currShopId, String keyword);


    public Map<String,Object> getSecondDeviceById(int id);

    // 데이터 초기화
}
