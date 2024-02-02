package com.momo.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Map;

@Data
@SuperBuilder
@NoArgsConstructor
public abstract class CommonQueryVO {
	protected String target;
	protected String order; // 정렬
	protected String asc = "asc"; // false: asc(오름차순), true: desc(내림차순)
	protected Integer offset;
	protected Integer limit;
}
