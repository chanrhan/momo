package com.momo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public abstract class CommonService<T,K> implements ICRUDService<T,K> {
	protected final ObjectMapper objectMapper = new ObjectMapper();
	protected String getSelectQueryString(Object ob) {
		Map<String,Object> map = null;
		try {
			map = objectMapper.readValue(ob.toString(), Map.class);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}

		StringBuilder sb = new StringBuilder(" ");
		if(map == null || map.isEmpty()){
			return "1 = 1";
		}
		Object order = map.get("order");
		Object side = map.get("side");
		Object offset = map.get("offset");
		Object limit = map.get("limit");

		map.forEach((key,value)->{
			if(key.equals("order") || key.equals("side") || key.equals("offset") || key.equals("limit")){
				return;
			}
			sb.append(key).append("=").append("'").append(value).append("' ").append("and ");
		});
		sb.append("1 = 1");
		if(order != null){
			sb.append("order by ").append(order);
			if(side != null){
				sb.append(" ").append(side).append(" ");
			}
		}
		if(offset != null && limit != null){
			sb.append("limit ").append(offset).append(" ").append(limit);
		}
		System.out.println(sb);
		return sb.toString();
	}
}
