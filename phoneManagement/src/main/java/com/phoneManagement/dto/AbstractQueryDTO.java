package com.phoneManagement.dto;

import lombok.Data;

@Data
public abstract class AbstractQueryDTO {
	public String search_column;
	public String search_keyword;

	public String orderby; // 정렬
	public boolean side = false; // false: asc(오름차순), true: desc(내림차순)
	public int offset; //
	public int limit;
}
