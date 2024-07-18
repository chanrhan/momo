package com.momo.service;

import com.momo.common.vo.*;
import com.momo.mapper.SaleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
	@Transactional
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
		List<SaleAppointmentVO> apmList = vo.getApmList();
		if(apmList == null || apmList.isEmpty()){
			return;
		}
		saleMapper.insertSaleAppointment(vo.getUserId(), vo.getSaleId(), apmList);

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
		List<SaleUsedDeviceVO> usedDeviceList = vo.getUsedDeviceList();

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
		List<SaleAppointmentVO> apmList = vo.getApmList();

		if(apmList == null || apmList.isEmpty()){
			return 0;
		}

		String userId = vo.getUserId();
		int saleId = vo.getSaleId();

		int rst = saleMapper.deleteAllSaleAppointment(userId, saleId);
		saleMapper.insertSaleAppointment(userId, saleId, apmList);

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
		List<SaleUsedDeviceVO> usedDeviceList = vo.getUsedDeviceList();

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

		sale.put("apm_list", saleMapper.getSaleAppointment(userId, saleId));
		sale.put("sup_list", saleMapper.getSaleSupport(userId, saleId));
		sale.put("add_list", saleMapper.getSaleAdd(userId, saleId));
		sale.put("card_list", saleMapper.getSaleCard(userId, saleId));
		sale.put("used_device_list", saleMapper.getSaleUsedDevice(userId, saleId));

		return sale;
	}


	public Integer getSaleTotalCount(String userId){
		return saleMapper.getSaleTotalCount(userId);
	}

	public int deleteSales(String userId, int[] deletes){
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

	public List<Map<String,Object>> getAppointment(SaleSearchVO vo){
		return saleMapper.getAppointment(vo);
	}


}
