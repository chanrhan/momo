package com.momo.mapper;

import com.momo.common.vo.GMDVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

// Global Master Data
@Mapper
public interface GMDMapper {
    // 문자메세지 템플릿
    public List<Map<String, String>> getMessageTemplate();
    public void insertMessageTemplate(String content);
    public int updateMessageTemplate(int msgId, String content);
    public int deleteMessageTemplate(int msgId);



    // 정적 목록
    public Map<String,Object> getDevice(GMDVO vo);
    public Map<String,Object> getSecondDevice(GMDVO vo);
    public Map<String,Object> getCtPlan(GMDVO vo);

    // insert one
    public void insertDevice(GMDVO vo);
    public void insertSecondDevice(GMDVO vo);
    public void insertCtPlan(GMDVO vo);

    public void insertInternetPlan(GMDVO vo);
    public void insertTvPlan(GMDVO vo);
    public void insertExtraService(GMDVO vo);
    public void insertSupportDiv(GMDVO vo);
    public void insertAddDiv(GMDVO vo);
    public void insertComb(GMDVO vo);

    // insert all
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
    public Map<String,Object> getInternetPlan(GMDVO vo);
    public Map<String,Object> getTvPlan(GMDVO vo);
    public Map<String,Object> getExtraService(GMDVO vo);
    public Map<String,Object> getSupportDiv(GMDVO vo);
    public Map<String,Object> getAddDiv(GMDVO vo);
    public Map<String,Object> getComb(GMDVO vo);


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

    // 순서 바꾸기
    public int changeOrderDevice(int currShopId, List<GMDVO> list);
    public int changeOrderSecondDevice(int currShopId, List<GMDVO> list);
    public int changeOrderCtPlan(int currShopId, List<GMDVO> list);

    public int changeOrderInternetPlan(int currShopId, List<GMDVO> list);
    public int changeOrderTvPlan(int currShopId, List<GMDVO> list);
    public int changeOrderSupportDiv(int currShopId, List<GMDVO> list);
    public int changeOrderAddDiv(int currShopId, List<GMDVO> list);
    public int changeOrderExsvc(int currShopId, List<GMDVO> list);
    public int changeOrderCombTp(int currShopId, List<GMDVO> list);
}
