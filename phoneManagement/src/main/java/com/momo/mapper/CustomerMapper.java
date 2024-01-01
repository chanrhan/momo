package com.momo.mapper;

import com.momo.dto.AdminDTO;
import com.momo.dto.CustomerDTO;
import com.momo.vo.CustomerVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CustomerMapper extends DefaultCRUDMapper<CustomerVO, CustomerDTO> {
	public CustomerVO selectById(String id);
	public CustomerVO selectByEmail(String email);
	public String selectPasswordById(String id);
	public int updatePassword(CustomerDTO customerDTO);
}
