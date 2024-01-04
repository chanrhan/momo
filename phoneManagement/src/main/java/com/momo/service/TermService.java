package com.momo.service;

import com.momo.dto.TermStatementDTO;
import com.momo.mapper.DefaultCRUDMapper;
import com.momo.mapper.TermMapper;
import com.momo.role.UserRole;
import com.momo.vo.TermVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TermService implements DefaultCRUDMapper<TermVO, TermStatementDTO> {
	private final TermMapper termMapper;

	@Override
	public int insert(TermStatementDTO key) {
		return termMapper.insert(key);
	}

	@Override
	public int update(TermStatementDTO key) {
		return 0;
	}

	@Override
	public int delete(TermStatementDTO key) {
		return 0;
	}

	@Override
	public List<TermVO> search(TermStatementDTO key) {
		return null;
	}

	public List<TermVO> selectAll(){
		return termMapper.selectAll();
	}

	public void enrollTermStatement(String id, UserRole role, String termSt){
		char[] terms = termSt.toCharArray();
		for(int i=0;i<terms.length;++i){
			insert(new TermStatementDTO(id, role.toString(), i, (terms[i] == '1')));
		}
	}


}
