package com.momo.dto;

import lombok.Data;

@Data
public abstract class AbstractQueryDTO {
	public String targetColumn;
	public String keyword;

	public String orderby; // 정렬
	public boolean side = false; // false: asc(오름차순), true: desc(내림차순)
	public int offset;
	public int limit;

	public String getSide(){
		return (side) ? "desc" : "asc";
	}
}
