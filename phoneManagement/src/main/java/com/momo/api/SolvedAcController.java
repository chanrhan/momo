package com.momo.api;

import com.momo.common.SolvedAcRequestVO;
import com.momo.common.SolvedAcResponseVO;
import com.momo.service.SolvedAcService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.Inet4Address;
import java.util.List;
import java.util.Map;

// 이하 GMDS (Global Master Data Set)
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/solved-ac")
public class SolvedAcController {
    private final SolvedAcService solvedAcService;

    @GetMapping("/user")
    public ResponseEntity<List<Map<String,Object>>> getAllUsers(){
        return ResponseEntity.ok(solvedAcService.getAllUsers());
    }

    @PostMapping("/problem")
    public ResponseEntity<List<Map<String,Object>>> getProblems(@RequestBody SolvedAcRequestVO vo){
        System.out.println(vo);
        return ResponseEntity.ok(solvedAcService.getProblems(vo));
    }

    @GetMapping("/reload")
    public ResponseEntity<Boolean> loadBaekjoonProblems(){
        return ResponseEntity.ok(solvedAcService.loadBaekjoonProblemStatus() > 0);
    }

    @PostMapping("/shared-problem")
    public ResponseEntity<Boolean> updateSharedProblem(@RequestBody List<Integer> list){
        solvedAcService.updateSharedProblem(list);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/shared-problem")
    public ResponseEntity<List<Map<String,Object>>> getSharedProblem(){
        return ResponseEntity.ok(solvedAcService.getSharedProblem());
    }


}
