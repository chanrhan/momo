package com.momo.service;

import com.momo.mapper.ExtraServiceMapper;
import com.momo.mapper.MsgFormMapper;
import com.momo.mapper.PlanMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MsgFormService {
	private final MsgFormMapper formMapper;

	private final PlanMapper planMapper;
	private final ExtraServiceMapper extraServiceMapper;

	private final UserService userService;
	private final ShopService shopService;

	public List<Map<String,Object>> getAllDefaultForm(){
		return formMapper.getAllDefaultForm();
	}

	public String createContent(int formId, int typeId, Map<String,Object> map){
		String content = "";
		if(formId <= -1){
			content = formMapper.selectDefaultForm(formId).get("content").toString();
		}else{
			content = formMapper.selectForm(formId).get("content").toString();
		}

		Map<String,Object> userMap = userService.selectOne(map);
		Map<String,Object> shop = shopService.selectOne(map);
		content = content.replace("%[seller_nm]%", userMap.get("name").toString())
				.replace("%[shop_nm]%]", shop.get("shop_nm").toString());


		switch (formId){
			case -2: // 요금제
				map = planMapper.getByMap(typeId);
				content = content.replace("%[plan_nm]%", map.get("plan_nm").toString())
						.replace("%[description]%", map.get("description").toString());
				break;
			case -3: // 부가서비스
				map = extraServiceMapper.getByMap(typeId);
				content = content.replace("%[ex_svc_nm]%", map.get("ex_svc_nm").toString())
						.replace("%[description]%", map.get("description").toString());
				break;
			default:
				break;
		}

		return content;
	}
}
