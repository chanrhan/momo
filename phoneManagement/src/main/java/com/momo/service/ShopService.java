package com.momo.service;

import com.momo.mapper.ShopMapper;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShopService extends CommonService {
	private final ShopMapper shopMapper;

	@Override
	public int insert(Map<String,Object> map) {
		return shopMapper.insert(map);
	}

	@Override
	public int update(Map<String,Object> map) {
		return shopMapper.update(map);
	}

	@Override
	public int delete(Map<String,Object> map) {
		return shopMapper.delete(map);
	}

	@Override
	public List<Map<String,Object>> select(Map<String,Object> map) {
		return shopMapper.select(getSelectQueryString(map));
	}

	@Override
	public Map<String,Object> selectOne(Map<String,Object> map) {
		return select(map).get(0);
	}

	public List<Map<String,Object>> search(SearchVO searchVO) {
		return shopMapper.search(searchVO);
	}

	@Override
	public List<Map<String,Object>> selectAll() {
		return shopMapper.selectAll();
	}

	public int getMaxCode(){
		Integer code = shopMapper.getMaxCode();
		if(code == null){
			return 0;
		}
		return code;
	}

	public List<Map<String,Object>> searchByRegion(Map<String,Object> map){
		return shopMapper.searchByRegion(map);
	}

	public List<Map<String,Object>> selectByUser(Map<String,Object> map){
		Map<String,Object> selectMap = new HashMap<>();
		if(map.get("role").equals("REPS")){
			selectMap.put("b_no", map.get("b_no"));
		}else{
			selectMap.put("shop_cd", map.get("shop_cd"));
		}
		return select(selectMap);
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
