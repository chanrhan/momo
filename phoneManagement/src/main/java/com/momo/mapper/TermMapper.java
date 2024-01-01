package com.momo.mapper;

import com.momo.domain.term.Term;
import com.momo.dto.TermDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TermMapper extends DefaultCRUDMapper<Term, TermDTO> {

}
