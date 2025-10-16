package com.momo.extern_api;

import com.momo.common.vo.aligo.alimtalk.request.AlimTalkMsgRequestVO;
import com.momo.common.vo.aligo.alimtalk.response.AlimTalkTemplateItem;
import com.momo.mapper.SaleMapper;
import com.momo.mapper.ShopMapper;
import com.momo.mapper.UserMapper;
import lombok.Builder;
import org.apache.ibatis.jdbc.Null;

import java.util.HashMap;
import java.util.Map;

public class AlimtalkTemplateGenerator {
    private static final String[] providerStr = new String[]{
      "SKT","KT","LG","판매점"
    };
    private final UserMapper userMapper;
    private final ShopMapper shopMapper;
    private final SaleMapper saleMapper;

    private final String userId;
    private final int shopId;
    private final int saleId;

    private final Map<String,String> map = new HashMap<>();

    @Builder
    public AlimtalkTemplateGenerator(String userId, int shopId, int saleId, UserMapper userMapper, ShopMapper shopMapper, SaleMapper saleMapper){
        this.userId = userId;
        this.shopId = shopId;
        this.saleId = saleId;
        this.userMapper = userMapper;
        this.shopMapper = shopMapper;
        this.saleMapper = saleMapper;
        init();
    }

    private void init(){
        Map<String,Object> m;
        if(userMapper != null){ // 유저 정보
            try{
                m = userMapper.getUserInfo(userId);
                map.put("#{회사명}", m.get("corp_nm").toString());
            }catch (NullPointerException e){
                e.printStackTrace();
            }

        }
        if(shopMapper != null){ // 매장 정보
            try{
                m = shopMapper.getShopById(shopId);
                map.put("#{매장명}", m.get("shop_nm").toString());
                map.put("#{매장번호}", m.get("shop_tel").toString());
                map.put("#{매장주소}", m.get("shop_addr").toString());
            }catch (NullPointerException e){
                e.printStackTrace();
            }

        }
        if(saleMapper != null){ // 판매일보 정보
            try{
                m = saleMapper.getSaleById(shopId, saleId);
                map.put("#{고객명}", m.get("cust_nm").toString());
                int provider = Integer.parseInt(m.get("provider").toString());
                map.put("#{통신사}", providerStr[provider]);
                map.put("#{판매자명}", saleMapper.getSellerNameBySaleId(shopId, saleId));
            }catch (NullPointerException e){
                e.printStackTrace();
            }
        }
    }

    public AlimTalkMsgRequestVO generate(AlimTalkTemplateItem tpl, AlimTalkMsgRequestVO req){
        String tplCode = req.getTplCode();
        String content = tpl.getTempltContent();

        for(String key : map.keySet()){
            content = content.replace(key, map.get(key));
        }

        req.setMessage_1(content);
        return req;
    }

    public String mapContent(AlimTalkTemplateItem tpl){
        String content = tpl.getTempltContent();

        for(String key : map.keySet()){
            content = content.replace(key, map.get(key));
        }

        return content;
    }


}
