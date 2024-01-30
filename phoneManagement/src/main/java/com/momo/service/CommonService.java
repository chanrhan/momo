package com.momo.service;

import java.util.Map;

public abstract class CommonService {
	protected String getUpdateQueryString(){
		return null;
	}
	protected String getSelectQueryString(Map<String,Object> map){
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
