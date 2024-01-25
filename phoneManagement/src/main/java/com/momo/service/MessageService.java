package com.momo.service;

import com.momo.mapper.*;
import com.momo.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MessageService {
	private final MsgFormMapper formMapper;
	private final MsgReserveMapper reserveMapper;

	private final PlanMapper planMapper;
	private final ExtraServiceMapper extraServiceMapper;

	private final AccountService accountService;
	private final ShopService shopService;

	public List<MessageVO> getReservedMessage(MessageVO messageVO){
		return reserveMapper.search(messageVO);
	}

	public List<MessageVO> getReservedMessageByBno(String bNo){
		return reserveMapper.getReservedMessageByBno(bNo);
	}

	public List<MessageVO> search(MessageVO messageVO){
		return reserveMapper.search(messageVO);
	}

	public List<MessageVO> getAllDefaultForm(){
		return formMapper.getAllDefaultForm();
	}

	public int reserve(MessageVO messageVO){
		return reserveMapper.insert(messageVO);
	}

	public int getMaxMsgReserveId(int shopCode){
		Integer result = reserveMapper.getMaxMsgId(shopCode);
		if(result == null){
			return 0;
		}
		return result;
	}

	public int reserveMessage(MessageVO messageVO){
		List<MessageVO> list = messageVO.getMsgRsvList();
		int maxMsgId = getMaxMsgReserveId(messageVO.getShopCd());
		int result = 0;

		String content = "";
		for(int i=0; i<list.size(); ++i){
			int formId = list.get(i).getFormId();
			int typeId = list.get(i).getTypeId();
			if(typeId == 0) continue;
			content = createContent(formId, typeId, messageVO);
			System.out.println(content);
			result = reserve(MessageVO.builder()
									 .msgId(maxMsgId+i+1)
									 .shopCd(messageVO.getShopCd())
									 .custNm(messageVO.getCustNm())
									 .custTel(messageVO.getCustTel())
									 .content(content)
									 .sellerId(messageVO.getSellerId())
									 .rsvDt(list.get(i).getRsvDt())
									 .build());
			if(result == 0){
				return 0;
			}
		}
		return result;
	}

	private String createContent(int formId, int typeId, MessageVO messageVO){
		String content = "";
		if(formId <= -1){
			content = formMapper.selectDefaultForm(formId).getContent();
		}else{
			content = formMapper.selectForm(formId).getContent();
		}

		UserInfoVO user = accountService.selectOne(UserInfoVO.builder().id(messageVO.getSellerId()).build());
		ShopVO shop = shopService.selectOne(ShopVO.builder().shopCd(messageVO.getShopCd()).build());
		content = content.replace("%[seller_nm]%", user.getName())
				.replace("%[shop_nm]%]", shop.getShopNm());

		Map<String, String> map;

		switch (formId){
			case -2: // 요금제
				map = planMapper.getByMap(typeId);
				content = content.replace("%[plan_nm]%", map.get("plan_nm"))
						.replace("%[description]%", map.get("description"));
				break;
			case -3: // 부가서비스
				map = extraServiceMapper.getByMap(typeId);
				content = content.replace("%[ex_svc_nm]%", map.get("ex_svc_nm"))
						.replace("%[description]%", map.get("description"));
				break;
			default:
				break;
		}

		return content;
	}
}
