package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TodoMapper {
    public List<Map<String,Object>> getTodoDetail(int currShopId, String date);
    public List<Integer> getTodoForCalendar(int currShopId, String date);

    public int updateTodoContent(int currShopId, String date, int todoId, String content);
    public int updateTodoColor(int currShopId,String date, int todoId, int color);

    public void insertTodo(int currShopId,String date, int color, String content);

    public int deleteTodo(int currShopId, String date, int todoId);
}
