package com.momo.vo;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class SaleVO {
	private int           saleNo; // 판매일보 번호
	// 고객 정보
	private String        custNm; // 고객 이름
	private String        custGd; // 고객 성별
	private int           custNo; // 고객 번호
	private String        custCd; // 고객 식별번호
	// 개통 정보
	private String        provider; // 통신사
	private LocalDateTime regiDt; // 개통일자
	private String        phMd; // 핸드폰 모델명
	private String        phStor; // 핸드폰 용량
	private String        itm; // 할부
	private String        regiDiv; // 개통 구분
	private String        regiTp; // 개통 유형
	private String        regiPlan; // 개통 요금제
	private String        updatePlan; // 변경 요금제
	private int           wlCms; // 무선 판매 수수료

	// 그린폰
	private String  greenMd; // 그린폰 모델명
	private boolean greenRet; // 그린폰 반납 여부

	// 세컨
	private String secMd; // 세컨 모델명
	private int    secCms; // 세컨 판매 수수료

	// 유선
	private String wrTp; // 유선 유형
	private String wrDiv; // 유선 구분
	private int    wrCms; // 유선 판매 수수료
	private String itRegiPlan; // 인터넷 개통 요금제
	private String itDecPlan; // 인터넷 하향 요금제
	private String tvRegiPlan; // TV 개통 요금제
	private String tvDecPlan; // TV 하향 요금제

	// 추가
	private String        addItem; // 추가 항목
	private String        addPay; // 추가 금액
	private LocalDateTime addDt; // 추가 날짜

	// 지원
	private String supDiv1; // 지원구분 1
	private int    supPay1; // 지원금액 1
	private String supDiv2;
	private int    supPay2;
	private String supDiv3;
	private int    supPay3;
	private String supDiv4;
	private int    supPay4;
	private String supDiv5;
	private int    supPay5;

	// 체크박스
	private boolean combCh; // 결합 변경 예정
	private boolean card; // 카드 예정
	private boolean cardDiv; // 카드 구분

	// 토탈
	private int    totAddPay; // 총 추가 금액
	private int    totRb; // 총 리베이트
	private String totSup; // 총 지원
	private int    defPc; // 디펜스율
	private int    sellerCms; // 판매자 수수료
	private int    wlPt; // 무선 포인트
	private int    wrPt; // 유선 포인트
	private int    totPt; // 총 포인트
	private String empId; // 담당 매니저 아이디

	// 기타 관리
	private String        spec; // 견적서
	private LocalDateTime wrExprDt; // 유선 만료 일자
	private boolean       noneDiscount; // 결합중 요금할인 빠짐
	private LocalTime     regiTime; // 개통 시간
	private String        etc; // 비고


}
