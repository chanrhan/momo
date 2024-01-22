package com.momo.vo;

import lombok.Data;

import java.util.Map;

@Data
public class MsgRegexVO {
	private int formId;
	private int shopCd;
	private int regexId;
	private Map<String, String> map;

	public MsgRegexVO(String key_1, String value_1, String key_2, String value_2, String key_3, String value_3, String key_4, String value_4, String key_5, String value_5, String key_6, String value_6, String key_7, String value_7, String key_8, String value_8, String key_9, String value_9, String key_10, String value_10, String key_11, String value_11, String key_12, String value_12, String key_13, String value_13, String key_14, String value_14, String key_15, String value_15) {
		map.put(key_1, value_1);
		map.put(key_2, value_2);
		map.put(key_3, value_3);
		map.put(key_4, value_4);
		map.put(key_5, value_5);
		map.put(key_6, value_6);
		map.put(key_7, value_7);
		map.put(key_8, value_8);
		map.put(key_9, value_9);
		map.put(key_10, value_10);
		map.put(key_11, value_11);
		map.put(key_12, value_12);
		map.put(key_13, value_13);
		map.put(key_14, value_14);
		map.put(key_15, value_15);
	}

	public String getInsertString(){
		StringBuilder sb = new StringBuilder();
		String key;
		String value;
		int idx = 1;
		for(Map.Entry<String,String> entry : map.entrySet()){
			key = entry.getKey();
			sb.append("key_").append(idx).append("=").append(key);
			value = entry.getValue();
			sb.append("value_").append(idx).append("=").append(value);
			++idx;
			if(idx != map.size()){
				sb.append(",");
			}
		}

		return sb.toString();
	}
}
