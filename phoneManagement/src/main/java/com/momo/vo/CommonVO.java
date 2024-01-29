package com.momo.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@SuperBuilder
@NoArgsConstructor
public class CommonVO {
	// tb_account
	String        id;
	String        pwd;
	String        name;
	String        email;
	String        tel;
	String        role;
	String        terms;
	LocalDateTime regiDt;

	// tb_alarm
	String alarmId;
	String senderId;
	String receiverId;
	String alarmTp;
	String content;
	String readSt;
	String sendDt;

	// tb_corp
	String repsId;
	@JsonProperty(value = "bNo")
	String bNo;
	@JsonProperty(value = "pEnNm")
	String pEnNm; // 사업자명 영문
	@JsonProperty(value = "pKoNm")
	String pKoNm; // 사업자명 영문
	String corpNm;
	String corpTel;
	String startDt;

	// tb_default_msg_form
	String formId;
	String formNm;

	// tb_emp

	// tb_extra_service

	// tb_msg_form

	// tb_msg_rsv

	// tb_plan

	// tb_region

	// tb_sale

	// tb_shop

	// tb_term

	// Query String Generataion
	private int                 page;
	private Map<String, Object> search;
	private Map<String, Object> select;

	private String  order; // 정렬
	private boolean asc = true; // false: asc(오름차순), true: desc(내림차순)
	private int     offset;
	private int     limit;

	public String getProp() {
		StringBuilder sb = new StringBuilder();
		if (order != null && !order.equals("")) {
			sb.append("order by ").append(order).append(" ").append((asc) ? "asc" : "desc");
		}
		if (offset > 0 && limit > 0) {
			sb.append("limit ").append(offset).append(" ").append(limit);
		}
		return sb.toString();
	}

	public String getAndSelect() {
		StringBuilder sb = new StringBuilder();
		if (select != null && !select.isEmpty()) {
			select.forEach((key, value) -> {
				if (value == null || value.equals("")) {
					return;
				}
				sb.append(key).append("=").append("'").append(value).append("'").append(" and ");
			});
		}
		sb.append(" 1 = 1");

		return sb.toString();
	}

	public String getOrSelect() {
		StringBuilder sb = new StringBuilder();
		if (select != null && !select.isEmpty()) {
			final int[] size = {0};
			select.forEach((key, value) -> {
				if (value == null || value.equals("")) {
					return;
				}
				sb.append(key).append("=").append("'").append(value).append("'");
				size[0]++;
				if (size[0] == select.size()) {
					sb.append(" and");
				}
				else {
					sb.append(" or ");
				}
			});
		}
		sb.append(" 1 = 1");

		return sb.toString();
	}

	public String getAndSearch() {
		StringBuilder sb = new StringBuilder();
		if (search != null && !search.isEmpty()) {
			search.forEach((key, value) -> {
				sb.append(key).append(" like ").append("'%").append(value).append("%'").append(" and ");
			});
		}
		sb.append(" 1 = 1");

		return sb.toString();
	}

	public String getOrSearch() {
		StringBuilder sb = new StringBuilder();
		if (search != null && !search.isEmpty()) {
			final int[] size = {0};
			search.forEach((key, value) -> {
				sb.append(key).append(" like ").append("'%").append(value).append("%'");
				size[0]++;
				if (size[0] == search.size()) {
					sb.append(" and");
				}
				else {
					sb.append(" or ");
				}
			});
		}
		sb.append(" 1 = 1");

		return sb.toString();
	}
}
