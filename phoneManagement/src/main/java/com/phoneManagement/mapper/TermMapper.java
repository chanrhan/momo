package com.phoneManagement.mapper;

import com.phoneManagement.domain.term.Term;
import com.phoneManagement.domain.user.Admin;
import com.phoneManagement.dto.TermDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TermMapper extends DefaultCRUDMapper<Term, TermDTO> {

}
