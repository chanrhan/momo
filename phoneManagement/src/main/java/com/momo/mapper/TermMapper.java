package com.momo.mapper;

import com.momo.vo.ItemCommonVO;
import com.momo.vo.SearchVO;
import com.momo.vo.TermVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TermMapper {
	// Term
	public int insertTerm(TermVO vo);
	public int updateTerm(TermVO vo);
	public int deleteTerm(int id);
	public List<Map<String,Object>> selectTerm(TermVO vo);
	public List<Map<String,Object>> searchTerm(SearchVO vo);
}
