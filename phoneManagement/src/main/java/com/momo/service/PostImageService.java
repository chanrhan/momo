package com.momo.service;

import com.momo.mapper.PostImageMapper;
import com.momo.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PostImageService {
    private final PostImageMapper postImageMapper;

    public List<Map<String,String>> getPostImageAll(int currShopId){
        return postImageMapper.getPostImageAll(currShopId);
    }

    public void insertPostImage(int currShopId, String text, String path){
        postImageMapper.insertPostImage(currShopId, text, path);
    }

    public int deletePostImage(int currShopId, int pimgId){
        return postImageMapper.deletePostImage(currShopId, pimgId);
    }

    public int deleteAll(int currShopId){
        return postImageMapper.deleteAll(currShopId);
    }
}
