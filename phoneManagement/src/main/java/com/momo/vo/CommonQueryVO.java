package com.momo.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Delegate;
import lombok.experimental.SuperBuilder;

import java.util.Map;

@Data
@SuperBuilder
@NoArgsConstructor
public abstract class AbstractQueryVO {
	protected Map<String,String> searchMap;
	protected Map<String,String> selectMap;

	protected String orderby; // 정렬
	protected boolean side = false; // false: asc(오름차순), true: desc(내림차순)
	protected int offset;
	protected int limit;
}
