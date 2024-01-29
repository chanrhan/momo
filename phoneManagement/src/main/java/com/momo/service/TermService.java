package com.momo.service;

import com.momo.mapper.TermMapper;
import com.momo.vo.CommonVO;
import com.momo.vo.TermVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TermService extends CommonService<TermVO,TermVO> {
	private final TermMapper termMapper;

	@Override
	public int insert(TermVO key) {
		return termMapper.insert(key);
	}

	@Override
	public int update(TermVO key) {
		return 0;
	}

	@Override
	public int delete(TermVO key) {
		return 0;
	}

	@Override
	public List<TermVO> select(TermVO map) {
		return termMapper.select(getSelectQueryString(map));
	}

	@Override
	public TermVO selectOne(TermVO key) {
		return select(key).get(0);
	}

	public List<TermVO> search(CommonVO commonVO) {
		return termMapper.search(commonVO);
	}

	public List<TermVO> selectAll(){
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
