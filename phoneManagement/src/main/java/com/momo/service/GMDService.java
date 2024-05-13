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

    public List<Map<String,Object>> getDevice(String keyword){
        return gmdMapper.getDevice(keyword);
    }

    public List<Map<String,Object>> getExtraService(String keyword){
        return gmdMapper.getExtraService(keyword);
    }

    public Map<String,String> getPhoneModel(){
        List<Map<String,String >> data = gmdMapper.getPhoneModel();
        Map<String,String> newMap = new HashMap<>();

        for(Map<String,String> map : data){
            newMap.put(map.get("ph_id"), map.get("ph_nm"));
        }

        return newMap;
    }
}
