package com.momo.service;

import com.momo.common.vo.*;
import com.momo.mapper.SaleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SaleService extends CommonService {
	private final SaleMapper saleMapper;

	public String getSpecFilePath(int id){
		return saleMapper.getSpecFilePath(id);
	}

	public boolean isDuplicatedTel(SaleVO vo){
		return saleMapper.isDuplicatedTel(vo);
	}

	// Common

	public int insertSale(SaleVO vo) {
		saleMapper.insertSale(vo);
		int maxSaleId = saleMapper.getMaxSaleId(vo.getUserId());
		vo.setSaleId(maxSaleId);
		insertAppointmentList(vo);
		insertSupportList(vo);
		insertAddList(vo);
		insertCardList(vo);
		insertUsedDeviceList(vo);
		return maxSaleId;
	}

	public void insertAppointmentList(SaleVO vo){
		List<SalePromiseVO> apmList = vo.getPmList();
		if(apmList == null || apmList.isEmpty()){
			return;
		}
		saleMapper.insertSalePromise(vo.getUserId(), vo.getSaleId(), apmList);

	}

	public void insertSupportList(SaleVO vo){
		List<SaleSupportVO> supList = vo.getSupList();
		if(supList == null || supList.isEmpty()){
			return;
		}
		saleMapper.insertSaleSupport(vo.getUserId(), vo.getSaleId(),supList);

	}

	public void insertAddList(SaleVO vo){
		List<SaleAddVO> addList = vo.getAddList();
		if(addList == null || addList.isEmpty()){
			return;
		}
		saleMapper.insertSaleAdd(vo.getUserId(), vo.getSaleId(),addList);
	}

	public void insertCardList(SaleVO vo){
		List<SaleCardVO> cardList = vo.getCardList();

		if(cardList == null || cardList.isEmpty()){
			return;
		}

		saleMapper.insertSaleCard(vo.getUserId(), vo.getSaleId(),cardList);
	}

	public void insertUsedDeviceList(SaleVO vo){
		List<SaleUsedDeviceVO> usedDeviceList = vo.getUdList();

		if(usedDeviceList == null || usedDeviceList.isEmpty()){
			return;
		}
		saleMapper.insertSaleUsedDevice(vo.getUserId(), vo.getSaleId(),usedDeviceList);
	}

	@Transactional
	public int updateSale(SaleVO vo) {
		int rst = saleMapper.updateSale(vo);
		rst += updateSaleAppointment(vo);
		rst += updateSaleSupport(vo);
		rst += updateSaleAdd(vo);
		rst += updateSaleCard(vo);
		rst += updateSaleUsedDevice(vo);
		return rst;
	}

	public int updateSaleAppointment(SaleVO vo){
		List<SalePromiseVO> apmList = vo.getPmList();

		if(apmList == null || apmList.isEmpty()){
			return 0;
		}

		String userId = vo.getUserId();
		int saleId = vo.getSaleId();

		int rst = saleMapper.deleteAllSalePromise(userId, saleId);
		saleMapper.insertSalePromise(userId, saleId, apmList);

		return rst;
	}

	public int updateSaleSupport(SaleVO vo){
		List<SaleSupportVO> supList = vo.getSupList();

		if(supList == null || supList.isEmpty()){
			return 0;
		}

		String userId = vo.getUserId();
		int saleId = vo.getSaleId();

		int rst =saleMapper.deleteAllSaleSupport(userId,saleId);
		saleMapper.insertSaleSupport(userId, saleId,supList);
		return rst;
	}

	public int updateSaleAdd(SaleVO vo){
		List<SaleAddVO> addList = vo.getAddList();

		if(addList == null || addList.isEmpty()){
			return 0;
		}

		String userId = vo.getUserId();
		int saleId = vo.getSaleId();

		int rst = saleMapper.deleteAllSaleAdd(userId,saleId);
		saleMapper.insertSaleAdd(userId, saleId,addList);
		return rst;
	}

	public int updateSaleCard(SaleVO vo){
		List<SaleCardVO> cardList = vo.getCardList();

		if(cardList == null || cardList.isEmpty()){
			return 0;
		}

		String userId = vo.getUserId();
		int saleId = vo.getSaleId();

		int rst = saleMapper.deleteAllSaleCard(userId, saleId);
		saleMapper.insertSaleCard(userId, saleId,cardList);
		return rst;
	}

	public int updateSaleUsedDevice(SaleVO vo){
		List<SaleUsedDeviceVO> usedDeviceList = vo.getUdList();

		if(usedDeviceList == null || usedDeviceList.isEmpty()){
			return 0;
		}

		String userId = vo.getUserId();
		int saleId = vo.getSaleId();

		int rst = saleMapper.deleteAllSaleUsedDevice(userId, saleId);
		saleMapper.insertSaleUsedDevice(userId, saleId,usedDeviceList);
		return rst;
	}



	public int deleteSale(String userId, int saleId) {
		return saleMapper.deleteSale(userId, saleId);
	}

	public List<Map<String,Object>> getSaleAll(SaleSearchVO vo){
		return saleMapper.getSaleAll(vo);
	}

	public Map<String,Object> getSaleOne(String userId, int saleId){
		Map<String,Object> sale = new HashMap<>();
		sale.put("sale", saleMapper.getSaleOne(userId,saleId));

		sale.put("pm_list", saleMapper.getSalePromiseDetail(userId, saleId));
		sale.put("sup_list", saleMapper.getSaleSupportDetail(userId, saleId));
		sale.put("add_list", saleMapper.getSaleAddDetail(userId, saleId));
		sale.put("card_list", saleMapper.getSaleCardDetail(userId, saleId));
		sale.put("ud_list", saleMapper.getSaleUsedDeviceDetail(userId, saleId));

		return sale;
	}



	public int deleteBulkSale(String userId, int[] deletes){
		int result = 0;
		for(int saleId: deletes){
			result += saleMapper.deleteSale(userId, saleId);
		}
		return result;
	}

	// task,= category
	public List<Map<String,Object>> getSaleAsUsedDevice(SaleSearchVO vo){
		return saleMapper.getSaleAsUsedDevice(vo);
	}

	public List<Map<String,Object>> getSaleAsCard(SaleSearchVO vo){
		return saleMapper.getSaleAsCard(vo);
	}

	public List<Map<String,Object>> getSaleAsComb(SaleSearchVO vo){
		return saleMapper.getSaleAsComb(vo);
	}

	public List<Map<String,Object>> getSaleAsSupport(SaleSearchVO vo){
		return saleMapper.getSaleAsSupport(vo);
	}

//	public List<Integer> getSaleAsPromise(SaleSearchVO vo){
//		return saleMapper.getSaleAsPromise(vo);
//	}


	// promise

	public List<Map<String, Object>> getPromise(SaleSearchVO vo){
		String userId = vo.getUserId();
		List<Map<String,Object>> sale = saleMapper.getSaleAsPromise(vo);

		for(int i=0;i<sale.size();++i){
			int saleId = Integer.parseInt(sale.get(i).get("sale_id").toString());
			List<Map<String,Object>> promise = saleMapper.getSalePromiseDetail(userId, saleId);
			sale.get(i).put("pm_list", promise);
		}

		return sale;
	}



	// total count
	public Integer getSaleTotalCount(String userId){
		return saleMapper.getSaleTotalCount(userId);
	}

	public Integer getSaleTotalUsedDeviceCount(String userId){
		return saleMapper.getSaleTotalUsedDeviceCount(userId);
	}
	public Integer getSaleTotalCardCount(String userId){
		return saleMapper.getSaleTotalCardCount(userId);
	}
	public Integer getSaleTotalCombCount(String userId){
		return saleMapper.getSaleTotalCombCount(userId);
	}
	public Integer getSaleTotalSupportCount(String userId){
		return saleMapper.getSaleTotalSupportCount(userId);
	}
	public Integer getSaleTotalPromiseCount(String userId){
		return saleMapper.getSaleTotalPromiseCount(userId);
	}


	// 진행현황 관리

	public int changeUsedDeviceState(String usedId, int saleId, int udId, int state){
		return saleMapper.changeUsedDeviceState(usedId, saleId, udId, state);
	}
	public int changeCardState(String usedId, int saleId, int cardId, int state){
		return saleMapper.changeCardState(usedId, saleId, cardId, state);
	}
	public int changeCombState(String usedId, int saleId, int state){
		return saleMapper.changeCombState(usedId, saleId, state);
	}
	public int changeSupportState(String usedId, int saleId, int supId, int state){
		return saleMapper.changeSupportState(usedId, saleId, supId, state);
	}
	public int changePromiseState(String userId, int saleId, int pmId, int checked){
		return saleMapper.changePromiseState(userId, saleId, pmId, checked);
	}

}
