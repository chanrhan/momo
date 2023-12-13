package com.phoneManagement.mapper;

import com.phoneManagement.domain.user.Admin;
import com.phoneManagement.domain.user.Customer;
import com.phoneManagement.domain.user.Employee;
import com.phoneManagement.dto.EmployeeDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmployeeMapper extends DefaultCRUDMapper<Employee, EmployeeDTO> {
	public Employee select(String id);
}
