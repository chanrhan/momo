package com.momo.service;

import com.momo.generator.MessageGenerator;
import com.momo.mapper.MsgCommonMapper;
import com.momo.util.IntegerUtil;
import com.momo.vo.*;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MsgCommonService extends CommonService {
	private final MessageGenerator messageGenerator;

	private final MsgCommonMapper msgCommonMapper;

	// Message Form
	public List<Map<String, Object>> selectForm(MsgCommonVO vo) {
		return msgCommonMapper.selectForm(vo);
	}
	public List<Map<String,Object>> getAllDefaultForm(){
		return msgCommonMapper.getAllDefaultForm();
	}

	// Message Reserve
	public int insertMsg(MsgCommonVO vo) {
		return msgCommonMapper.insertMsg(vo);
	}
	public int updateMsg(MsgCommonVO vo) {
		return msgCommonMapper.updateMsg(vo);
	}
	public int deleteMsgReserve(int id) {
		return msgCommonMapper.deleteMsg(id);
	}
	public List<Map<String, Object>> selectMsg(MsgCommonVO vo) {
		return msgCommonMapper.selectMsg(vo);
	}

	public List<Map<String, Object>> selectMsgBySession(HttpSession session) {
		MsgCommonVO vo = new MsgCommonVO();

		vo.setShopId(Integer.parseInt(session.getAttribute("shop_id").toString()));
		vo.setCorpId(Integer.parseInt(session.getAttribute("corp_id").toString()));

		return selectMsg(vo);
	}

	public List<Map<String, Object>> searchMsg(SearchVO vo) {
		vo.setOrder("regi_dt");
		vo.setAsc("desc");
		return msgCommonMapper.searchMsg(vo);
	}

	public List<Map<String, Object>> searchMsgBySession(SearchVO vo, HttpSession session) {
		if(vo.getSelect() == null){
			vo.setSelect(new HashMap<>());
		}
		vo.getSelect().put("shop_id", IntegerUtil.zeroToNull(session.getAttribute("shop_id")));
		vo.getSelect().put("corp_id", session.getAttribute("corp_id"));

		return msgCommonMapper.searchMsg(vo);
	}


	// 코드 너무 지저분하니 나중에 수정할 것
	public int reserve(MsgCommonVO vo){
		List<MsgCommonVO> list = vo.getMsgList();
		int result = 0;

		String content = "";
		for(int i=0; i<list.size(); ++i){
			vo.setFormId(list.get(i).getFormId());
			if(list.get(0).getTypeId() == null || list.get(0).getTypeId() == 0) continue;
			vo.setTypeId(list.get(i).getTypeId());
			String _content = selectForm(MsgCommonVO.builder().formId(vo.getFormId()).build()).get(0).get("content").toString();
			vo.setContent(_content);
			content = messageGenerator.createContent(vo);

			vo.setContent(content);
			vo.setRsvDt(list.get(i).getRsvDt());

			result = insertMsg(vo);
			if(result == 0){
				return 0;
			}
		}
		return result;
	}


}
