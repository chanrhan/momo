package com.momo.service;

import com.momo.mapper.ShopCommonMapper;
import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import com.momo.vo.UserCommonVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShopService extends CommonService {
	private final ShopCommonMapper shopCommonMapper;

	public int insertShop(ShopCommonVO vo) {
		return shopCommonMapper.insertShop(vo);
	}

	public int updateShop(ShopCommonVO vo) {
		return shopCommonMapper.updateShop(getUpdateQueryString(vo));
	}

	public int deleteShop(int id) {
		return shopCommonMapper.deleteShop(id);
	}

	public List<Map<String,String>> selectShop(ShopCommonVO vo) {
		return shopCommonMapper.selectShop(getSelectQueryString(vo));
	}

//	public Map<String,Object> selectOne(Map<String,Object> map) {
//		return select(map).get(0);
//	}

	public List<Map<String,String>> searchShop(SearchVO vo) {
		return shopCommonMapper.searchShop(vo);
	}

	public int getMaxCode(){
		Integer code = shopCommonMapper.maxShopId();
		if(code == null){
			return 0;
		}
		return code;
	}

	public List<Map<String,String>> selectShopByUser(UserCommonVO vo){
		ShopCommonVO shopCommonVO = new ShopCommonVO();
		if(vo.getRole().equals("REPS")){
			shopCommonVO.setBNo(vo.getBNo());
		}else{
			shopCommonVO.setShopId(vo.getShopId());
		}
		return selectShop(shopCommonVO);
	}

//	public Paging<ShopVO> searchBranch(ShopVO shopVO){
//		Paging<ShopVO> paging = new Paging<>(shopVO.getPage(), 10);
//		shopVO.setOffset(paging.getOffset());
//		shopVO.setLimit(paging.getSize());
////		ShopVO vo = ShopVO.builder()
//////				.keywordMap(keyword)
////				.offset(paging.getOffset())
////				.limit(paging.getSize())
////				.build();
//
//		paging.setRecords(shopMapper.searchBranch(shopVO));
//		paging.setTotalRecordCount(shopMapper.countBranch(shopVO));
//
//		return paging;
//	}

//	public Paging<ShopVO> selectPage(int pageNum, String targetColumn, String keyword){
//		Paging<ShopVO> paging = new Paging<>(pageNum, 10);
//		ShopVO vo = ShopVO.builder()
//				.offset(paging.getOffset())
//				.limit(paging.getSize())
//				.build();
//
//		paging.setRecords(shopMapper.search(vo));
//		paging.setTotalRecordCount(shopMapper.getTotalRecordCount(vo));
//
//		return paging;
//	}
}
