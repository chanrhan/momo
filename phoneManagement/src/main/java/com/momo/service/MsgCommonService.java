package com.momo.service;

import com.momo.mapper.ItemCommonMapper;
import com.momo.mapper.MsgCommonMapper;
import com.momo.vo.MsgCommonVO;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MsgFormService extends CommonService {
	private final MsgCommonMapper msgCommonMapper;

	private final ItemCommonMapper itemCommonMapper;

	private final UserCommonService userCommonService;
	private final ShopCommonService shopCommonService;

	public int insertMsgForm(MsgCommonVO vo) {
		return msgCommonMapper.insertMsgForm(vo);
	}
	public int updateMsgForm(MsgCommonVO vo) {
		return msgCommonMapper.updateMsgForm(getUpdateQueryString(vo));
	}
	public int deleteMsgForm(int id) {
		return msgCommonMapper.deleteMsgForm(id);
	}
	public List<Map<String, String>> selectMsgForm(MsgCommonVO vo) {
		return msgCommonMapper.selectMsgForm(getSelectQueryString(vo));
	}
	public List<Map<String, String>> searchMsgForm(SearchVO vo) {
		return msgCommonMapper.searchMsgForm(vo);
	}

	public List<Map<String,String>> getAllDefaultForm(){
		return msgCommonMapper.getAllDefaultForm();
	}

	public String createContent(MsgCommonVO vo){
		int formId = vo.getFormId();
		int typeId
		String content = selectMsgForm(MsgCommonVO.builder().formId(formId).build()).get(0).get("content");
//		if(formId <= -1){
//		}else{
//			content = msgCommonMapper.selectForm(formId).get("content").toString();
//		}

		Map<String,Object> user = userCommonService.selectUser()
		Map<String,Object> shop = shopCommonService.selectOne(map);
		content = content.replace("%[seller_nm]%", user.get("name").toString())
				.replace("%[shop_nm]%]", shop.get("shop_nm").toString());


		switch (formId){
			case -2: // 요금제
				map = planMapper.getByMap(typeId);
				content = content.replace("%[plan_nm]%", map.get("plan_nm").toString())
						.replace("%[description]%", map.get("description").toString());
				break;
			case -3: // 부가서비스
				map = itemCommonMapper.getByMap(typeId);
				content = content.replace("%[ex_svc_nm]%", map.get("ex_svc_nm").toString())
						.replace("%[description]%", map.get("description").toString());
				break;
			default:
				break;
		}

		return content;
	}
}
