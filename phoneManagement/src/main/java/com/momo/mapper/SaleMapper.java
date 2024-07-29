package com.momo.mapper;

import com.momo.common.vo.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SaleMapper{
	// Sale
	public int insertSale(SaleVO vo);
	public int updateSale(SaleVO vo);
	public int deleteSale(String userId, int saleId);
	public List<Map<String,Object>> getSaleAll(SaleSearchVO vo);
	public Map<String,Object> getSaleOne(String userId, int saleId);

	// task, category
	public List<Map<String,Object>> getSaleAsUsedDevice(SaleSearchVO vo);
	public List<Map<String,Object>> getSaleAsCard(SaleSearchVO vo);
	public List<Map<String,Object>> getSaleAsComb(SaleSearchVO vo);
	public List<Map<String,Object>> getSaleAsSupport(SaleSearchVO vo);
	public List<Map<String,Object>> getSaleAsPromise(SaleSearchVO vo);

	public Integer getMaxSaleId(String userId);

	public Integer getSaleTotalCount(String userId);

	public boolean isDuplicatedTel(SaleVO vo);
	public String getSpecFilePath(int id);

	public List<Map<String,Object>> getSalePromiseDetail(String userId, int saleId);
	public List<Map<String,Integer>> getSaleSupportDetail(String userId, int saleId);
	public List<Map<String,Integer>> getSaleAddDetail(String userId, int saleId);
	public List<Map<String,Object>> getSaleCardDetail(String userId, int saleId);
	public List<Map<String,Object>> getSaleUsedDeviceDetail(String userId, int saleId);

	public int insertSalePromise(String userId, int saleId, List<SalePromiseVO> list);
	public int insertSaleSupport(String userId, int saleId, List<SaleSupportVO> list);
	public int insertSaleAdd(String userId, int saleId, List<SaleAddVO> list);
	public int insertSaleCard(String userId, int saleId, List<SaleCardVO> list);
	public int insertSaleUsedDevice(String userId, int saleId, List<SaleUsedDeviceVO> list);

	public int updateSaleAsPromise(String userId, int saleId, int pmId, boolean checked, String content);
	public int updateSaleSupport(String userId, int saleId, int supId, int div, int amount);
	public int updateSaleAdd(String userId, int saleId, int addId, int div, int amount);
	public int updateSaleCard(String userId, int saleId, int cardId, int cardNm, int cardTp);
	public int updateSaleUsedDevice(String userId, int saleId, int usedDeviceId, String usedDeviceNm, int usedDeviceStor);

	public Integer getSaleTotalPromiseCount(String userId);
	public Integer getSaleTotalSupportCount(String userId);
//	public Integer getSaleAddCount(String userId, int saleId);
	public Integer getSaleTotalCardCount(String userId);
	public Integer getSaleTotalCombCount(String userId);
	public Integer getSaleTotalUsedDeviceCount(String userId);

	public int deleteSalePromise(String userId, int saleId, int pmId);
	public int deleteSaleSupport(String userId, int saleId, int supId);
	public int deleteSaleAdd(String userId, int saleId, int addId);
	public int deleteSaleCard(String userId, int saleId, int cardId);
	public int deleteSaleUsedDevice(String userId, int saleId, int usedDeviceId);

	public int deleteAllSalePromise(String userId, int saleId);
	public int deleteAllSaleSupport(String userId, int saleId);
	public int deleteAllSaleAdd(String userId, int saleId);
	public int deleteAllSaleCard(String userId, int saleId);
	public int deleteAllSaleUsedDevice(String userId, int saleId);

	// 진행현황 관리
	public int changeUsedDeviceState(String userId, int saleId, int udId, int state);
	public int changeCardState(String userId, int saleId, int cardId, int state);
	public int changeCombState(String userId, int saleId, int state);
	public int changeSupportState(String userId, int saleId, int supId, int state);
	public int changePromiseState(String userId, int saleId, int pmId, int checked);


	// 메인 페이지 (Dashboard)
	//  각 항목별 요약 (판매 금액/개수, 전월대비 증가/감소량 퍼센트 )
	public List<Map<String,Object>> getSummary(String userId, String prevDate, String currDate);

	// 판매일보 대비 항목(카드/세컨/부가서비스) 비율 (항목 개수)
	public List<Map<String, Object>> getSaleRatio(String userId, String date);

	// 각 항목별 진행 현황 (완료 개수, 총 개수)
	public List<Map<String,Object>> getWorkInProcess(String userId, String date);

	// 각 항목별 전월 대비 증가/감소량
	public Integer getCtChangeAmount(CommonVO vo);
	public Integer getInternetChangeAmount(CommonVO vo);
	public Integer getTvChangeAmount(CommonVO vo);
	public Float getTotalCmsChangeAmount(CommonVO vo);
	public Float getAvgCmsChangeAmount(CommonVO vo);

	// 그래프(Graph) 페이지
	// 그래프 요약
	public List<Map<String,Object>> getGraphSummary(CommonVO vo);

	public Map<String,String> getCtGraphByDateType(CommonVO vo);
	public Map<String,String> getInternetGraphByDateType(CommonVO vo);
	public Map<String,String> getTvGraphByDateType(CommonVO vo);
	public Map<String,String> getMarginGraphByDateType(CommonVO vo);
	public Map<String,String> getAvgMarginGraphByDateType(CommonVO vo);

	// 기준별 평균 마진
	public List<Integer> getAvgMarginBySelectType(CommonVO vo);

	// 모델명, 요금제 통계
	public List<Map<String,Object>> getDeviceStat(CommonVO vo);
	public List<Map<String,Object>> getPlanStat(CommonVO vo);
	public List<Map<String,Object>> getSecondDeviceStat(CommonVO vo);
}
