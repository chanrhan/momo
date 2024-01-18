package com.momo.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.time.LocalTime;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
public class SaleVO extends AbstractQueryVO{
	private int saleNo; // 판매일보 번호
	private int shopCd; // 매장 코드

	// 고객 정보
	private String custNm; // 고객 이름
	private String custGd; // 고객 성별 (Gender)
	private int    custTel; // 고객 전화번호
	private String custCd; // 고객 식별번호 (개인: 생년월일, 법인: 사업자번호)

	// 개통 정보
	private String        provider; // 통신사
	private LocalDateTime actvDt; // 개통일자 (Activate)
	private String        phMd; // 핸드폰 모델명 (Model)
	private String        phStor; // 핸드폰 용량 (Storage)
	private String        istm; // 할부 (Installment)
	private String        regiDiv; // 개통 구분 (Division)
	private String        actvTp; // 개통 유형 (Type)
	private String        actvlan; // 개통 요금제
	private String        movePlan; // 변경 요금제
	private int           ctCms; // 무선 판매 수수료 (Cordless Telephone Commission)

	// 그린폰
	private String  greenMd; // 그린폰 모델명
	private boolean greenRet; // 그린폰 반납 여부 (Return)

	// 세컨
	private String secMd; // 세컨 모델명
	private int    secCms; // 세컨 판매 수수료

	// 유선
	private String wtType; // 유선 유형 (Wire Telephone)
	private String wtDiv; // 유선 구분
	private int    wtCms; // 유선 판매 수수료
	private String netActvPlan; // 인터넷 개통 요금제 (Internet)
	private String netDecPlan; // 인터넷 하향 요금제 (Decrement)
	private String tvActvPlan; // TV 개통 요금제
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
	private boolean combMove; // 결합 변경 예정 (Change)
	private boolean card; // 카드 예정
	private boolean cardDiv; // 카드 구분

	// 토탈
	private int    totAddPay; // 총 추가 금액
	private int    totRb; // 총 할인 (Rebate)
	private String totSup; // 총 지원 (Supportion)
	private int    defPc; // 디펜스율 (Defense Percent)
	private int    sellerCms; // 판매자 수수료
	private int    ctPt; // 무선 포인트 (Point)
	private int    wtPt; // 유선 포인트
	private int    totPt; // 총 포인트
	private String sellerId; // 담당 매니저(판매자) 아이디

	// 기타 관리
	private String        spec; // 견적서
	private LocalDateTime wtExprDt; // 유선 만료 일자 (Wire Telephone Expire Date)
	private boolean       nonDisc; // 결합중 요금할인 빠짐 (None Discount)
	private LocalTime     actvTime; // 개통 시간
	private String        etc; // 비고
}
