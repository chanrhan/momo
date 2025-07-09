package com.momo.service;

import com.momo.common.vo.VisitedShopVO;
import com.momo.extern_api.NaverMapsUtil;
import com.momo.mapper.VisitedShopMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final VisitedShopMapper visitedShopMapper;

    public void insertVisitedShop(VisitedShopVO vo){
        visitedShopMapper.insertVisitedShop(vo);
    }

    public List<Map<String,Object>> getVisitedShopList(VisitedShopVO vo){
        return visitedShopMapper.getVisitedShopList(vo);
    }

    public Map<String,Object> getGeocode(String addr){
        return NaverMapsUtil.getGecode(addr);
    }
}
