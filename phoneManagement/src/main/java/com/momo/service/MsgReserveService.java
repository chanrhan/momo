package com.momo.service;

import com.momo.mapper.*;
import com.momo.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MsgReserveService extends CommonService {
	private final MsgReserveMapper reserveMapper;

	private final MsgFormService msgFormService;

	@Override
	public List<Map<String,Object>> select(Map<String,Object> map){
		return reserveMapper.select(getSelectQueryString(map));
	}


	public List<Map<String,Object>> selectByBNo(String bNo){
		return reserveMapper.selectByBNo(bNo);
	}


	public List<Map<String,Object>> selectByShopCode(String shopCd){
		return reserveMapper.selectByShopCode(shopCd);
	}

	public List<Map<String,Object>> search(CommonVO commonVO){
		return reserveMapper.search(commonVO);
	}

	@Override
	public Map<String, Object> selectOne(Map<String, Object> map) {
		return select(map).get(0);
	}

	@Override
	public List<Map<String, Object>> selectAll() {
		return reserveMapper.selectAll();
	}

	@Override
	public int insert(Map<String,Object> map){
		return reserveMapper.insert(map);
	}

	public int getMaxMsgReserveId(int shopCode){
		Integer result = reserveMapper.getMaxMsgId(shopCode);
		if(result == null){
			return 0;
		}
		return result;
	}

	@Override
	public int delete(Map<String,Object> map){
		return reserveMapper.delete(map);
	}

	@Override
	public int update(Map<String,Object> map){
		return reserveMapper.update(map);
	}

	public int reserve(Map<String,Object> map){
		List<Map<String,Object>> list = (List<Map<String,Object>>) map.get("rsv_list");
		int maxMsgId = getMaxMsgReserveId(Integer.parseInt(map.get("shop_cd").toString()));
		int result = 0;

		String content = "";

//		Map<String,Object> insertMap = new HashMap<>();
//		insertMap.put("shop_cd", map.get("shop_cd"));
//		insertMap.put("cust_nm", map.get("cust_nm"));
//		insertMap.put("cust_tel",  map.get("cust_tel"));
//		insertMap.put("seller_id",  map.get("shop_cd"));
		for(int i=0; i<list.size(); ++i){
			int formId = Integer.parseInt(list.get(i).get("form_id").toString());
			int typeId = Integer.parseInt(list.get(i).get("type_id").toString());
			if(typeId == 0) continue;
			content = msgFormService.createContent(formId, typeId, map);

			map.put("msg_id", maxMsgId+i+1);
			map.put("content",content);
			map.put("rsv_dt", list.get(i).get("rsv_dt"));

			result = insert(map);
			if(result == 0){
				return 0;
			}
		}
		return result;
	}
}
