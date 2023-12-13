package com.phoneManagement.mapper;

import com.phoneManagement.domain.user.Admin;
import com.phoneManagement.domain.user.Customer;
import com.phoneManagement.dto.AdminDTO;
import com.phoneManagement.dto.CustomerDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CustomerMapper extends DefaultCRUDMapper<Customer, CustomerDTO> {
	public Customer select(String id);
}
