package com.momo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.momo.util.TransactionTemplateUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;



public abstract class CommonService {
	@Autowired
	protected TransactionTemplateUtil transactionTemplate;

	protected final ObjectMapper objectMapper = new ObjectMapper()
			.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);

	@Deprecated
	protected String getUpdateQueryString(Object ob){
		StringBuilder sb = new StringBuilder(" ");
		Map<String,String> map = objectMapper.convertValue(ob, Map.class);
		if(map == null || map.isEmpty()){
			return "1 = 1";
		}

		Object target = map.get("target");
		if(target == null){
			return "1 = 1";
		}

		int[] index = {0};

		map.forEach((key,value)->{
//			System.out.println("key: "+key+", value: "+value);
//			System.out.println(map.size()+" / "+index[0]);
			if(value == null || value.equals("")) return;
			if(key.equals("target") || key.equals("order") || key.equals("asc") || key.equals("offset") || key.equals("limit")){
				return;
			}
			if(index[0] > 0){
				sb.append(",");
			}else{
				++index[0];
			}
			sb.append(key).append("=").append("'").append(value).append("'");
		});
		sb.append(" where ").append(target).append("='").append(map.get(target)).append("'");
		System.out.println(sb);
		return sb.toString();
	}
	@Deprecated
	protected String getSelectQueryString(Object ob){
		System.out.println("qs ob: "+ob);
		if(ob == null){
			return "1 = 1";
		}
		StringBuilder sb = new StringBuilder(" ");
		Map<String,Object> map = objectMapper.convertValue(ob, Map.class);
//		System.out.println(map);

		if(map == null || map.isEmpty()){
			return "1 = 1";
		}
		Object order = map.getOrDefault("order", null);
		Object asc = map.getOrDefault("asc", null);
		Object offset = map.getOrDefault("offset", null);
		Object limit = map.getOrDefault("limit", null);

		map.forEach((key,value)->{
			if(value == null || value.equals("0")) return;
			if(key.equals("order") || key.equals("asc") || key.equals("offset") || key.equals("limit")){
				return;
			}
			sb.append(key).append("=").append("'").append(value).append("' ").append("and ");
		});
		sb.append("1 = 1 ");
		if(order != null){
			sb.append("order by ").append(order);
			if(asc != null){
				sb.append(" ").append(asc).append(" ");
			}
		}
		if(offset != null && limit != null){
			sb.append("limit ").append(offset).append(" ").append(limit);
		}
		return sb.toString();
	}
}
