package com.momo.service;

import com.momo.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoMapper todoMapper;

    public List<Map<String,Object>> getTodoDetail(int currShopId, String date){
        return todoMapper.getTodoDetail(currShopId,date);
    }

    public List<Integer> getTodoForCalendar(int currShopId, String date){
        return todoMapper.getTodoForCalendar(currShopId,date);
    }

    public int updateTodoContent(int currShopId, String date, int todoId, String content){
        return todoMapper.updateTodoContent(currShopId, date, todoId, content);
    }

    public int updateTodoColor(int currShopId,String date, int todoId, int color){
        return todoMapper.updateTodoColor(currShopId, date, todoId, color);
    }

    public void insertTodo(int currShopId,String date, int color, String content){
        todoMapper.insertTodo(currShopId, date, color, content);
    }

    public int deleteTodo(int currShopId, String date, int todoId){
        return todoMapper.deleteTodo(currShopId, date, todoId);
    }
}
