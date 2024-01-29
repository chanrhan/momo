package com.momo.service;

import com.momo.mapper.TermMapper;
import com.momo.vo.CommonVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TermService extends CommonService {
	private final TermMapper termMapper;

	@Override
	public int insert(Map<String,Object> key) {
		return termMapper.insert(key);
	}

	@Override
	public int update(Map<String,Object> key) {
		return 0;
	}

	@Override
	public int delete(Map<String,Object> key) {
		return 0;
	}

	@Override
	public List<Map<String,Object>> select(Map<String,Object> map) {
		return termMapper.select(getSelectQueryString(map));
	}

	@Override
	public Map<String,Object> selectOne(Map<String,Object> key) {
		return select(key).get(0);
	}

	public List<Map<String,Object>> search(CommonVO commonVO) {
		return termMapper.search(commonVO);
	}

	public List<Map<String,Object>> selectAll(){
		return termMapper.selectAll();
	}

//	public int enrollTermStatement(String id, String role, String termSt){
//		int result = 0;
//		char[] terms = termSt.toCharArray();
//		for(int i=0;i<terms.length;++i){
//			result = insert(TermVO.builder().userId(id).role(role).checked((terms[i] == '1')).build());
//			if(result == 0){
//				return 0;
//			}
//		}
//		return result;
//	}


}
