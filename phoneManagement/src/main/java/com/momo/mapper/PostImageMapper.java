package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface PostImageMapper {
    public List<Map<String,String>> getPostImageAll(int currShopId);

    public void insertPostImage(int currShopId, String text, String path);
    public int deletePostImage(int currShopId, int pimgId);
    public int deleteAll(int currShopId);
}
