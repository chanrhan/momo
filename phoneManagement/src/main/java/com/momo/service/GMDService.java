package com.momo.service;

import com.momo.common.vo.GMDVO;
import com.momo.mapper.GMDMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class GMDService {
    private final GMDMapper gmdMapper;

    // 정적 목록
    public List<Map<String,Object>> getDevice(String keyword, Integer provider){
        return gmdMapper.getDevice(keyword, provider);
    }

    public List<Map<String,Object>> getSecondDevice(String keyword, Integer provider){
        return gmdMapper.getSecondDevice(keyword,provider);
    }
    public List<Map<String,Object>> getCtPlan(String keyword, Integer provider){
        return gmdMapper.getCtPlan(keyword,provider);
    }

    public Map<String,Object> getSecondDeviceById(int id){
        return gmdMapper.getSecondDeviceById(id);
    }

    // 동적 목록
    public List<Map<String,Object>> getExtraService(int currShopId, String keyword, Integer provider){
        return gmdMapper.getExtraService(currShopId, keyword,provider);
    }

    public List<Map<String,Object>> getInternetPlan(int currShopId, String keyword, Integer provider){
        return gmdMapper.getInternetPlan(currShopId, keyword,provider);
    }

    public List<Map<String,Object>> getTvPlan(int currShopId, String keyword, Integer provider){
        return gmdMapper.getTvPlan(currShopId, keyword,provider);
    }

    public List<Map<String,Object>> getComb(int currShopId, String keyword){
        return gmdMapper.getComb(currShopId, keyword);
    }

    public List<Map<String,Object>> getSupportDiv(int currShopId, String keyword){
        return gmdMapper.getSupportDiv(currShopId, keyword);
    }

    public List<Map<String,Object>> getAddDiv(int currShopId, String keyword){
        return gmdMapper.getAddDiv(currShopId, keyword);
    }





}
