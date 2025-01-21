package com.momo.mapper;

import com.momo.common.vo.PostImageVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface PostImageMapper {
    public List<Map<String,Object>> getPostImageAll(int currShopId);

    public Integer insertPostImage( PostImageVO vo);
    public Integer insertEmptyPostImage(int currShopId);
    public int updatePostImage( PostImageVO vo);
    public int updatePostText( PostImageVO vo);
    public int deletePost(int currShopId, int pimgId);
    public int deletePostImage(int currShopId, int pimgId);
    public int deleteAll(int currShopId);
}
