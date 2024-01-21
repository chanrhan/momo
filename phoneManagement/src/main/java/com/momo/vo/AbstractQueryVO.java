package com.momo.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Map;

@Data
@SuperBuilder
@NoArgsConstructor
public abstract class AbstractQueryVO {
	protected int                page;
//	protected String targetColumn;
	protected Map<String,String> searchMap;
	protected Map<String,String> selectMap;

	protected String orderby; // 정렬
	protected boolean side = false; // false: asc(오름차순), true: desc(내림차순)
	protected int offset;
	protected int limit;

	@Data
	public static class KeywordMap{
		private String name;
		private String tel;
	}

	public String getSide(){
		return (side) ? "desc" : "asc";
	}

	public String getAndSelect(){
		StringBuilder sb = new StringBuilder();
		if(selectMap != null && !selectMap.isEmpty()){
			selectMap.forEach((key, value)->{
				sb.append(key).append("=").append("'")
						.append(value).append("'").append(" and ");
			});
		}
		sb.append(" 1 = 1");

		return sb.toString();
	}

	public String getOrSelect(){
		StringBuilder sb = new StringBuilder();
		if(selectMap != null && !selectMap.isEmpty()){
			final int[] size = {0};
			selectMap.forEach((key, value)->{
				sb.append(key).append("=").append("'")
						.append(value).append("'");
				size[0]++;
				if(size[0] == selectMap.size()){
					sb.append(" and");
				}else{
					sb.append(" or ");
				}
			});
		}
		sb.append(" 1 = 1");

		return sb.toString();
	}

	public String getAndSearch(){
		StringBuilder sb = new StringBuilder();
		if(searchMap != null && !searchMap.isEmpty()){
			searchMap.forEach((key, value)->{
				sb.append(key).append(" like ").append("'%")
						.append(value).append("%'").append(" and ");
			});
		}
		sb.append(" 1 = 1");

		return sb.toString();
	}

	public String getOrSearch(){
		StringBuilder sb = new StringBuilder();
		if(searchMap != null && !searchMap.isEmpty()){
			final int[] size = {0};
			searchMap.forEach((key, value)->{
				sb.append(key).append(" like ").append("'%")
						.append(value).append("%'");
				size[0]++;
				if(size[0] == searchMap.size()){
					sb.append(" and");
				}else{
					sb.append(" or ");
				}
			});
		}
		sb.append(" 1 = 1");

		return sb.toString();
	}
}
