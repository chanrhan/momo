package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
import com.momo.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/v1/todo")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @GetMapping("")
    public ResponseEntity<List<Integer>> getTodoForCalendar(@RequestParam String date){
        String username = SecurityContextUtil.getUsername();
        return ResponseEntity.ok(todoService.getTodoForCalendar(username, date));
    }

    @GetMapping("/detail")
    public ResponseEntity<List<Map<String,Object>>> getTodoDetail(@RequestParam String date){
        String username = SecurityContextUtil.getUsername();
        return ResponseEntity.ok(todoService.getTodoDetail(username, date));
    }

    @PostMapping("/detail/content")
    public ResponseEntity<Boolean> updateTodoContent(@RequestBody Map<String,Object> map){
        String username = SecurityContextUtil.getUsername();
        int id = Integer.parseInt(map.get("index").toString());
        String content = map.get("content").toString();
        String date = map.get("date").toString();

        return ResponseEntity.ok(todoService.updateTodoContent(username,date, id,content) > 0);
    }

    @PostMapping("/detail/color")
    public ResponseEntity<Boolean> updateTodoColor(@RequestBody Map<String,Object> map){
        String username = SecurityContextUtil.getUsername();
        int id = Integer.parseInt(map.get("index").toString());
        int color = Integer.parseInt(map.get("color").toString());
        String date = map.get("date").toString();

        return ResponseEntity.ok(todoService.updateTodoColor(username, date, id, color) > 0);
    }

    @PostMapping("/detail/add")
    public ResponseEntity<Boolean> addTodo(@RequestBody Map<String,Object> map){
        String username = SecurityContextUtil.getUsername();
        int color = Integer.parseInt(map.get("color").toString());
        String content = map.get("content").toString();
        String date = map.get("date").toString();

        todoService.insertTodo(username,date, color, content);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/detail/del")
    public ResponseEntity<Boolean> deleteTodo(@RequestBody Map<String,Object> map){
        String username = SecurityContextUtil.getUsername();
        int id = Integer.parseInt(map.get("id").toString());
        String date = map.get("date").toString();

        return ResponseEntity.ok(todoService.deleteTodo(username, date, id) > 0);
    }
}
