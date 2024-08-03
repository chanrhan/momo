package com.momo.api;

import com.momo.common.util.HttpSessionUtils;
import com.momo.service.ImageService;
import com.momo.service.PostImageService;
import com.momo.service.TodoService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/v1/pimg")
@RequiredArgsConstructor
public class PostImageController {
    private final PostImageService postImageService;
    private final ImageService imageService;

    @GetMapping("")
    public ResponseEntity<List<Map<String,Object>>> getPostImageAll(HttpSession session){
        List<Map<String,String>> list = postImageService.getPostImageAll(HttpSessionUtils.getCurrentShopId(session));
        return null;
    }

    @PostMapping("")
    public ResponseEntity<Boolean> addPostImage(HttpSession session,
                                                @RequestPart String text,
                                                @RequestPart MultipartFile file){
        int currShopId = HttpSessionUtils.getCurrentShopId(session);
        String path = imageService.upload("pimg", file);
        postImageService.insertPostImage(currShopId, text, path);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/del")
    public ResponseEntity<Boolean> deletePostImage(HttpSession session,
                                                   @RequestParam int id){
        int currShopid = HttpSessionUtils.getCurrentShopId(session);
        return ResponseEntity.ok(postImageService.deletePostImage(currShopid, id) > 0);
    }

    @GetMapping("/del/all")
    public ResponseEntity<Boolean> deleteAll(HttpSession session){
        int currShopid = HttpSessionUtils.getCurrentShopId(session);
        return ResponseEntity.ok(postImageService.deleteAll(currShopid) > 0);
    }

}
