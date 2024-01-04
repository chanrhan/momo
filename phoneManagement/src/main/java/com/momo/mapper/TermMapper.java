package com.momo.mapper;

import com.momo.vo.TermVO;
import com.momo.dto.TermStatementDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TermMapper extends DefaultCRUDMapper<TermVO, TermStatementDTO> {

}
