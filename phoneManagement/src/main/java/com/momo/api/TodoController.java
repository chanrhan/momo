package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
import com.momo.service.TodoService;
import jakarta.servlet.http.HttpSession;
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
    public ResponseEntity<List<Integer>> getTodoForCalendar(HttpSession session,
                                                            @RequestParam String date){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        return ResponseEntity.ok(todoService.getTodoForCalendar(currShopId, date));
    }

    @GetMapping("/detail")
    public ResponseEntity<List<Map<String,Object>>> getTodoDetail(HttpSession session,
                                                                  @RequestParam String date){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        return ResponseEntity.ok(todoService.getTodoDetail(currShopId, date));
    }

    @PostMapping("/detail/content")
    public ResponseEntity<Boolean> updateTodoContent(HttpSession session,
                                                     @RequestBody Map<String,Object> map){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        int id = Integer.parseInt(map.get("index").toString());
        String content = map.get("content").toString();
        String date = map.get("date").toString();

        return ResponseEntity.ok(todoService.updateTodoContent(currShopId,date, id,content) > 0);
    }

    @PostMapping("/detail/color")
    public ResponseEntity<Boolean> updateTodoColor(HttpSession session,
                                                   @RequestBody Map<String,Object> map){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        int id = Integer.parseInt(map.get("index").toString());
        int color = Integer.parseInt(map.get("color").toString());
        String date = map.get("date").toString();

        return ResponseEntity.ok(todoService.updateTodoColor(currShopId, date, id, color) > 0);
    }

    @PostMapping("/detail/add")
    public ResponseEntity<Boolean> addTodo(HttpSession session,
                                           @RequestBody Map<String,Object> map){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        int color = Integer.parseInt(map.get("color").toString());
        String content = map.get("content").toString();
        String date = map.get("date").toString();

        todoService.insertTodo(currShopId,date, color, content);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/detail/del")
    public ResponseEntity<Boolean> deleteTodo(HttpSession session,
                                              @RequestBody Map<String,Object> map){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        int id = Integer.parseInt(map.get("id").toString());
        String date = map.get("date").toString();

        return ResponseEntity.ok(todoService.deleteTodo(currShopId, date, id) > 0);
    }
}
