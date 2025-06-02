package com.momo.api;

import com.momo.common.SolvedAcRequestVO;
import com.momo.common.SolvedAcResponseVO;
import com.momo.service.SolvedAcService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 이하 GMDS (Global Master Data Set)
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/solved-ac")
public class SolvedAcController {
    private final SolvedAcService solvedAcService;

    @GetMapping("/user")
    public ResponseEntity<Boolean> getLoginedUserInfo(){
        return ResponseEntity.ok(solvedAcService.getLoginedUserInfo());
    }

    @PostMapping("/problem")
    public ResponseEntity<List<List<SolvedAcResponseVO>>> getPage(@RequestBody SolvedAcRequestVO vo){
        System.out.println(vo);
        return ResponseEntity.ok(solvedAcService.getPage(vo));
    }


}
