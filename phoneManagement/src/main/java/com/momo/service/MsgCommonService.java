package com.momo.service;

import com.momo.mapper.ItemCommonMapper;
import com.momo.mapper.MsgCommonMapper;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MsgCommonService extends CommonService {
	private final MsgCommonMapper msgCommonMapper;
	private final ItemCommonMapper itemCommonMapper;

	private final ItemCommonService itemCommonService;
	private final UserCommonService userCommonService;
	private final ShopCommonService shopCommonService;

	// Message Form
	public int insertForm(MsgCommonVO vo) {
		return msgCommonMapper.insertForm(vo);
	}
	public int updateMsgForm(MsgCommonVO vo) {
		return msgCommonMapper.updateForm(vo);
	}
	public int deleteForm(int id) {
		return msgCommonMapper.deleteForm(id);
	}
	public List<Map<String, Object>> selectForm(MsgCommonVO vo) {
		return msgCommonMapper.selectForm(vo);
	}
	public List<Map<String, Object>> searchForm(SearchVO vo) {
		return msgCommonMapper.searchForm(vo);
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
	public Map<String,Object> selectMsgById(int id){
		MsgCommonVO vo = MsgCommonVO.builder().msgId(id).build();
		return selectMsgByContext(vo).get(0);
	}

	public List<Map<String, Object>> selectMsgByContext(MsgCommonVO vo) {
		Map<String,Object> emp = userCommonService.selectEmpById(SecurityContextUtil.getUsername());

		if(emp.get("role").equals("REPS")){
			vo.setBpNo(emp.get("bp_no").toString());
		}else{
			vo.setShopId(Integer.parseInt(emp.get("shop_id").toString()));
		}
		return selectMsg(vo);
	}

	public List<Map<String, Object>> selectMsgByContext() {
		return selectMsgByContext(new MsgCommonVO());
	}
	public List<Map<String, Object>> searchMsg(SearchVO vo) {
		vo.setOrder("regi_dt");
		vo.setAsc("desc");
		return msgCommonMapper.searchMsg(vo);
	}

	public List<Map<String, Object>> searchMsgByRole(SearchVO vo) {
		String shopId = vo.getSelect().get("shop_id").toString();
		if(shopId != null && shopId.equals("0")){
			vo.getSelect().remove("shop_id");
			if(vo.getSelect().get("bp_no") == null){
				String bpNo = shopCommonService.getBpNoByShopId(Integer.parseInt(shopId));
				vo.getSelect().put("bp_no", bpNo);
			}
		}

		return msgCommonMapper.searchMsg(vo);
	}

	public int getMaxMsgId(){
		Integer result = msgCommonMapper.getMaxMsgId();
		if(result == null){
			return 0;
		}
		return result;
	}

	public int reserve(MsgCommonVO vo){
		List<MsgCommonVO> list = vo.getMsgList();
		int maxMsgId = getMaxMsgId();
		int result = 0;

		String content = "";
		for(int i=0; i<list.size(); ++i){
			vo.setFormId(list.get(i).getFormId());
			if(list.get(0).getTypeId() == null || list.get(0).getTypeId() == 0) continue;
			vo.setTypeId(list.get(i).getTypeId());
//			int formId = Integer.parseInt(list.get(i).get("form_id").toString());
//			int typeId = Integer.parseInt(list.get(i).get("type_id").toString());
			content = createContent(vo);

			vo.setMsgId(maxMsgId+i+1);
			vo.setContent(content);
			vo.setRsvDt(list.get(i).getRsvDt());

			result = insertMsg(vo);
			if(result == 0){
				return 0;
			}
		}
		return result;
	}

	public String createContent(MsgCommonVO vo){
		int formId = vo.getFormId();
		int typeId = vo.getTypeId();
		String content = selectForm(MsgCommonVO.builder().formId(formId).build()).get(0).get("content").toString();

		Map<String,Object > user = userCommonService.selectUser(UserCommonVO.builder().id(vo.getSellerId()).build()).get(0);
		Map<String,Object> shop = shopCommonService.selectShop(ShopCommonVO.builder().shopId(vo.getShopId()).build()).get(0);
		content = content.replace("%[seller_nm]%", user.get("name").toString())
				.replace("%[shop_nm]%]", shop.get("shop_nm").toString());


		Map<String, Object> map = null;
		switch (formId){
			case -2: // 요금제
				map = itemCommonService.selectPlan(ItemCommonVO.builder().planId(typeId).build()).get(0);
				content = content.replace("%[plan_nm]%", map.get("plan_nm").toString())
						.replace("%[description]%", map.get("description").toString());
				break;
			case -3: // 부가서비스
				map = itemCommonService.selectExsvc(ItemCommonVO.builder().exsvcId(typeId).build()).get(0);
				content = content.replace("%[exsvc_nm]%", map.get("exsvc_nm").toString())
						.replace("%[description]%", map.get("description").toString());
				break;
			default:
				break;
		}

		return content;
	}
}
