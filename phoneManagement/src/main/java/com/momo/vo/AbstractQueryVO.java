package com.momo.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public abstract class AbstractQueryVO {
	protected String targetColumn;
	protected String keyword;

	protected String orderby; // 정렬
	protected boolean side = false; // false: asc(오름차순), true: desc(내림차순)
	protected int offset;
	protected int limit;

	public String getSide(){
		return (side) ? "desc" : "asc";
	}
}
