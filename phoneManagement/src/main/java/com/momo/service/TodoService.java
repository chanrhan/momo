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

    public List<Map<String,Object>> getTodoDetail(String userId, String date){
        return todoMapper.getTodoDetail(userId,date);
    }

    public List<Integer> getTodoForCalendar(String userId, String date){
        return todoMapper.getTodoForCalendar(userId,date);
    }

    public int updateTodoContent(String userId, String date, int todoId, String content){
        return todoMapper.updateTodoContent(userId, date, todoId, content);
    }

    public int updateTodoColor(String userId,String date, int todoId, int color){
        return todoMapper.updateTodoColor(userId, date, todoId, color);
    }

    public void insertTodo(String userId,String date, int color, String content){
        todoMapper.insertTodo(userId, date, color, content);
    }

    public int deleteTodo(String userId, String date, int todoId){
        return todoMapper.deleteTodo(userId, date, todoId);
    }
}
