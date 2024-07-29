package com.momo.common.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public abstract class BaseVO {
	protected String userId;
	protected String keyword;
	protected String target;
	protected String order; // 정렬
	protected boolean asc = false; // true: asc(오름차순), false: desc(내림차순)
	protected Integer offset;
	protected Integer limit;

	public String getAsc(){
		return asc ? "asc" : "desc";
	}

//	protected Integer zeroToNull(Integer value){
//		return (value == null || value == 0) ? null : value;
//	}
}
