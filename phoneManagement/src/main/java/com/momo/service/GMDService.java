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
    public List<Map<String,Object>> getExtraService(String userId, String keyword, Integer provider){
        return gmdMapper.getExtraService(userId, keyword,provider);
    }

    public List<Map<String,Object>> getInternetPlan(String userId, String keyword, Integer provider){
        return gmdMapper.getInternetPlan(userId, keyword,provider);
    }

    public List<Map<String,Object>> getTvPlan(String userId, String keyword, Integer provider){
        return gmdMapper.getTvPlan(userId, keyword,provider);
    }

    public List<Map<String,Object>> getComb(String userId, String keyword){
        return gmdMapper.getComb(userId, keyword);
    }

    public List<Map<String,Object>> getSupportDiv(String userId, String keyword){
        return gmdMapper.getSupportDiv(userId, keyword);
    }

    public List<Map<String,Object>> getAddDiv(String userId, String keyword){
        return gmdMapper.getAddDiv(userId, keyword);
    }





}
