package com.momo.mapper;

import com.momo.common.SolvedAcRequestVO;
import com.momo.common.SolvedAcResponseVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SolvedAcMapper {
    public List<Map<String,Object>> getAllUsers();
    public List<Map<String,String>> getContinuousCompleteCount();

    public List<Map<String,Object>> getAllUsersLastRead();
    public void updateLastRead(String id, Integer lastRead);

    public void insertMarkedProblems(List<SolvedAcResponseVO> list);
    public List<Map<String,Object>> getBaekjoonProblems(SolvedAcRequestVO vo);

    public boolean existBaekjoonProblem(int problemId);
    public void insertBaekjoonProblem(int problemId, String title, int level);

    public void insertWeeklyScore(int target, int fine);
}