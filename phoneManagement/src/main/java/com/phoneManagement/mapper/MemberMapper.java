package com.phoneManagement.mapper;

import com.phoneManagement.domain.member.Customer;
import com.phoneManagement.domain.member.Staff;
import com.phoneManagement.dto.MemberQueryDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberMapper {
	public Customer findCustomerById(int id);
	public List<Customer> findAllCustomer();
	public int addCustomer(MemberQueryDTO memberQueryDTO);

	public Staff findStaffById(int id);
	public List<Staff> findAllStaff();
	public int addStaff(MemberQueryDTO memberQueryDTO);
}
