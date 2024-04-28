package com.momo.service;

import com.momo.common.util.SecurityContextUtil;
import com.momo.mapper.SaleMapper;
import com.momo.common.vo.SaleVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SaleService extends CommonService {
	private final SaleMapper        saleMapper;

	public String getSpecFilePath(int id){
		return saleMapper.getSpecFilePath(id);
	}

	public boolean isDuplicatedTel(SaleVO vo){
		return saleMapper.isDuplicatedTel(vo);
	}

	// Common
	public int insertSale(SaleVO vo) {
		return saleMapper.insertSale(vo);
	}
	public int updateSale(SaleVO vo) {
		return saleMapper.updateSale(vo);
	}
	public int deleteSale(int id) {
		return saleMapper.deleteSale(id);
	}


	public List<Map<String,Object>> getSale(SaleVO vo){
		return saleMapper.getSale(vo);
	}

	public int deleteSales(int[] deletes){
		int result = 0;
		for(int saleId: deletes){
			result += saleMapper.deleteSale(saleId);
		}
		return result;
	}

	public List<Map<String,Object>> getSaleByCategory(String category, SaleVO vo){
		return switch (category) {
			case "card" -> saleMapper.getSaleAsCard(vo);
			case "green" -> saleMapper.getSaleAsUsedDevice(vo);
			case "comb" -> saleMapper.getSaleAsCombination(vo);
			case "support" -> saleMapper.getSaleAsSupport(vo);
			default -> null;
		};
	}

}
