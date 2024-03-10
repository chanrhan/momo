package com.momo.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class SaleVO extends CommonQueryVO {
	private Integer corpId;
	private Integer dupTel; // 중복된 전화번호 개수
	private Integer saleId; // 판매일보 번호
	private Integer shopId; // 매장 코드
	private String  corpBpNo; // 회사 사업자등록번호
	private String  shopBpNo; // 매장 사업자등록번호

	// 고객 정보
	private String custNm; // 고객 이름
	private String custGd; // 고객 성별 (Gender)
	private String custTel; // 고객 전화번호
	private String custCd; // 고객 식별번호 (개인: 생년월일, 법인: 사업자번호)

	// 날씨
	private int weather; // 날씨 코드

	// 개통 정보
	private String    provider; // 통신사
//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd",timezone = "Asia/Seoul")
	private LocalDate actvDt; // 개통일자 (Activate)
	private String    phMd; // 핸드폰 모델명 (Model)
	private String phColor; //
	private String  phStor; // 핸드폰 용량 (Storage)
	private String  istm; // 할부 (Installment)
	private String  actvDiv; // 개통 구분 (Division)
	private String  actvTp; // 개통 유형 (Type)
	private String  actvPlan; // 개통 요금제
	private String  movePlan; // 변경 요금제
	private Integer ctCms; // 무선 판매 수수료 (Cordless Telephone Commission)

	// 그린폰
	private String  greenMd; // 그린폰 모델명
	private Boolean greenRet; // 그린폰 반납 여부 (Return)

	// 세컨
	private String  secMd; // 세컨 모델명
	private Integer secCms; // 세컨 판매 수수료
	private Boolean secSt; // 세컨 연결 여부

	// 유선
	private String  wtTp; // 유선 유형 (Wire Telephone)
	private String  wtDiv; // 유선 구분
	private Integer wtCms; // 유선 판매 수수료
	private String  netActvPlan; // 인터넷 개통 요금제 (Internet)
	private String  netDecPlan; // 인터넷 하향 요금제 (Decrement)
	private String  tvActvPlan; // TV 개통 요금제
	private String  tvDecPlan; // TV 하향 요금제

	// 추가
	private String addItem; // 추가 항목
	private String addPay; // 추가 금액
//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd",timezone = "Asia/Seoul")
	private LocalDate addDt; // 추가 날짜

	// 지원
	private List<String> supDiv; // 지원구분 리스트
	private List<String> supPay; // 지원금액 리스트

	// 체크박스
	private Boolean friend; // 지인
	private Boolean exsvc; // 부가 서비스
	private Boolean combMove; // 결합 변경 예정 (Change)
	private Boolean combSt; // 결합 변경 여부
	private Boolean card; // 카드 예정
	private Boolean cardSt; // 카드 변경 여부
	private String cardDiv; // 카드 구분

	// 토탈
	private Integer totAddPay; // 총 추가 금액
	private Integer totRb; // 총 할인 (Rebate)
	private String  totSup; // 총 지원 (Supportion)
	private Integer defPc; // 디펜스율 (Defense Percent)
	private Integer sellerCms; // 판매자 수수료
	private Integer ctPt; // 무선 포인트 (Point)
	private Integer wtPt; // 유선 포인트
	private Integer totPt; // 총 포인트
	private String  sellerId; // 담당 매니저(판매자) 아이디

	// 기타 관리
	private String  spec; // 견적서
//	@DateTimeFormat(pattern = "yyyy-MM-dd")
//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd",timezone = "Asia/Seoul")
	private LocalDate  wtExprDt; // 유선 만료 일자 (Wire Telephone Expire Date)
	private Boolean nonDisc; // 결합중 요금할인 빠짐 (None Discount)
	private Boolean rsvSt; // 문자 발송 여부
	private String  actvTime; // 개통 시간
	private String  etc; // 비고

	// 예약 발송
	private List<MsgCommonVO> msgRsvList;

	public String getSupDiv() {
		if(supDiv == null) return null;
		StringBuilder sb = new StringBuilder();
		for(int i=0;i<supDiv.size();++i){
			sb.append(supDiv.get(i));
			if(i < supDiv.size() - 1){
				sb.append(",");
			}
		}
		return sb.toString();
	}

	public String getSupPay() {
		if(supPay == null) return null;
		StringBuilder sb = new StringBuilder();
		for(int i=0;i<supPay.size();++i){
			sb.append(supPay.get(i));
			if(i < supPay.size() - 1){
				sb.append(",");
			}
		}
		return sb.toString();
	}
}
