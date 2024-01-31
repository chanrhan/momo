package com.momo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public abstract class CommonService {
	protected final ObjectMapper objectMapper = new ObjectMapper();

	protected String getUpdateQueryString(Object ob, String targetColumn){
		StringBuilder sb = new StringBuilder(" ");
		Map<String,String> map = null;
		try {
			map = objectMapper.readValue(ob.toString(), Map.class);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
		if(map == null || map.isEmpty()){
			return "1 = 1";
		}

		map.forEach((key,value)->{
			sb.append(key).append("=").append("'").append(value).append("' ").append(", ");
		});
		sb.append("1 = 1 ");
		sb.append("where ").append(targetColumn).append("=").append(map.get(targetColumn));
		return sb.toString();
	}
	protected String getSelectQueryString(Object ob){
		if(ob == null){
			return "1 = 1";
		}
		StringBuilder sb = new StringBuilder(" ");
		Map<String,String> map = null;
		try {
			map = objectMapper.readValue(ob.toString(), Map.class);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}

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
