package com.momo.controller;

import com.momo.common.vo.PostImageVO;
import com.momo.service.CommonService;
import com.momo.service.ImageService;
import com.momo.service.PostImageService;
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
    private final CommonService commonService;

    @GetMapping("")
    public ResponseEntity<List<Map<String,Object>>> getPostImageAll(HttpSession session){
        return ResponseEntity.ok(postImageService.getPostImageAll(commonService.getCurrentShopId(session)));
    }

    @PostMapping("/add")
    public ResponseEntity<Integer> addPostImage(HttpSession session,
                                                @RequestPart(value = "body") PostImageVO vo,
                                                @RequestPart(required = false) MultipartFile file){
        int currShopId = commonService.getCurrentShopId(session);
        vo.setCurrShopId(currShopId);

        return ResponseEntity.ok(postImageService.insertPostImage(vo));
    }

    @GetMapping("/add/empty")
    public ResponseEntity<Integer> addEmptyPostImage(HttpSession session){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(postImageService.insertEmptyPostImage(currShopId));
    }

    @PostMapping("/update/file")
    public ResponseEntity<Boolean> updatePostImage(HttpSession session,
                                                @RequestPart(value = "body") PostImageVO vo,
                                                @RequestPart(required = false) MultipartFile file){
        int currShopId = commonService.getCurrentShopId(session);
        String path = imageService.upload("pimg", file);
        vo.setCurrShopId(currShopId);
        vo.setPath(path);
        return ResponseEntity.ok(postImageService.updatePostImage(vo) > 0);
    }

    @PostMapping("/update/text")
    public ResponseEntity<Boolean> updatePostText(HttpSession session,
                                                   @RequestBody PostImageVO vo){
        int currShopId = commonService.getCurrentShopId(session);
        vo.setCurrShopId(currShopId);
        return ResponseEntity.ok(postImageService.updatePostText(vo) > 0);
    }


    @GetMapping("/del")
    public ResponseEntity<Boolean> deletePost(HttpSession session,
                                                   @RequestParam int id){
        int currShopid = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(postImageService.deletePost(currShopid, id) > 0);
    }

    @GetMapping("/del/file")
    public ResponseEntity<Boolean> deletePostImage(HttpSession session,
                                                   @RequestParam int id){
        int currShopid = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(postImageService.deletePostImage(currShopid, id) > 0);
    }

    @GetMapping("/del/all")
    public ResponseEntity<Boolean> deleteAll(HttpSession session){
        int currShopid = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(postImageService.deleteAll(currShopid) > 0);
    }

}
