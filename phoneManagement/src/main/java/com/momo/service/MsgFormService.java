package com.momo.service;

import com.momo.mapper.ExtraServiceMapper;
import com.momo.mapper.MsgFormMapper;
import com.momo.mapper.MsgReserveMapper;
import com.momo.mapper.PlanMapper;
import com.momo.vo.MessageVO;
import com.momo.vo.ShopVO;
import com.momo.vo.UserInfoVO;
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

	private final AccountService accountService;
	private final ShopService shopService;

	public List<MessageVO> getAllDefaultForm(){
		return formMapper.getAllDefaultForm();
	}

	public String createContent(int formId, int typeId, MessageVO messageVO){
		String content = "";
		if(formId <= -1){
			content = formMapper.selectDefaultForm(formId).getContent();
		}else{
			content = formMapper.selectForm(formId).getContent();
		}

		Map<String,Object> userMap = accountService.selectOne(messageVO);
		Map<String,Object> shop = shopService.selectOne(messageVO);
		content = content.replace("%[seller_nm]%", userMap.get("name").toString())
				.replace("%[shop_nm]%]", shop.get("shop_nm").toString());


		switch (formId){
			case -2: // 요금제
				messageVO = planMapper.getByMap(typeId);
				content = content.replace("%[plan_nm]%", messageVO.get("plan_nm").toString())
						.replace("%[description]%", messageVO.get("description").toString());
				break;
			case -3: // 부가서비스
				messageVO = extraServiceMapper.getByMap(typeId);
				content = content.replace("%[ex_svc_nm]%", messageVO.get("ex_svc_nm").toString())
						.replace("%[description]%", messageVO.get("description").toString());
				break;
			default:
				break;
		}

		return content;
	}
}
