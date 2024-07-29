package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TodoMapper {
    public List<Map<String,Object>> getTodoDetail(String userId, String date);
    public List<Integer> getTodoForCalendar(String userId, String date);

    public int updateTodoContent(String userId, String date, int todoId, String content);
    public int updateTodoColor(String userId,String date, int todoId, int color);

    public void insertTodo(String userId,String date, int color, String content);

    public int deleteTodo(String userId, String date, int todoId);
}
