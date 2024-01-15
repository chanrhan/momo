package com.momo.service;

import com.momo.mapper.DefaultCRUDMapper;
import com.momo.mapper.TermMapper;
import com.momo.role.UserRole;
import com.momo.vo.TermVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TermService implements DefaultCRUDService<TermVO, TermVO> {
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
	public List<TermVO> select(TermVO key) {
		return termMapper.select(key);
	}

	public List<TermVO> search(TermVO key) {
		return null;
	}

	public List<TermVO> selectAll(){
		return termMapper.selectAll();
	}

	public int enrollTermStatement(String id, String role, String termSt){
		int result = 0;
		char[] terms = termSt.toCharArray();
		for(int i=0;i<terms.length;++i){
			result = insert(TermVO.builder().userId(id).role(role).checked((terms[i] == '1')).build());
			if(result == 0){
				return 0;
			}
		}
		return result;
	}


}
