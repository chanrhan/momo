package com.momo.mapper;

import com.momo.common.vo.GMDVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

// Global Master Data
@Mapper
public interface GMDMapper {
    // 정적 목록
    public Map<String,Object> getDevice(String keyword, Integer provider);
    public Map<String,Object> getSecondDevice(String keyword, Integer provider);
    public Map<String,Object> getCtPlan(String keyword, Integer provider);

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
    public Map<String,Object> getInternetPlan(int currShopId, String keyword, Integer provider);
    public Map<String,Object> getTvPlan(int currShopId, String keyword, Integer provider);
    public Map<String,Object> getExtraService(int currShopId, String keyword, Integer provider);
    public Map<String,Object> getSupportDiv(int currShopId, String keyword);
    public Map<String,Object> getAddDiv(int currShopId, String keyword);
    public Map<String,Object> getComb(int currShopId, String keyword);


    public Map<String,Object> getSecondDeviceById(int id);

    // 삭제
    public int deleteDeviceAll(List<Integer> list);
    public int deleteSecondDeviceAll(List<Integer> list);
    public int deleteCtPlanAll(List<Integer> list);

    public int deleteInternetPlanAll(int currShopId, List<Integer> list);
    public int deleteTvPlanAll(int currShopId, List<Integer> list);
    public int deleteSupportDivAll(int currShopId, List<Integer> list);
    public int deleteAddDivAll(int currShopId, List<Integer> list);
    public int deleteExsvcAll(int currShopId, List<Integer> list);
    public int deleteCombTpAll(int currShopId, List<Integer> list);

    // 수정
    public int updateDevice(GMDVO vo);
    public int updateSecondDevice(GMDVO vo);
    public int updateCtPlan(GMDVO vo);

    public int updateInternetPlan(GMDVO vo);
    public int updateTvPlan(GMDVO vo);
    public int updateSupportDiv(GMDVO vo);
    public int updateAddDiv(GMDVO vo);
    public int updateExsvc(GMDVO vo);
    public int updateCombTp(GMDVO vo);

}
