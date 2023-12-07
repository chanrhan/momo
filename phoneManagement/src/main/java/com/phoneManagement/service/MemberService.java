package com.phoneManagement.service;

import com.phoneManagement.domain.member.Customer;
import com.phoneManagement.domain.member.Staff;
import com.phoneManagement.dto.MemberQueryDTO;
import com.phoneManagement.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberMapper memberMapper;

	public Customer findCustomerById(int id){
		return memberMapper.findCustomerById(id);
	}
	public List<Customer> findAllCustomer(){
		return memberMapper.findAllCustomer();
	}
	public int addCustomer(MemberQueryDTO memberQueryDTO){
		return memberMapper.addCustomer(memberQueryDTO);
	}

	public Staff findStaffById(int id){
		return memberMapper.findStaffById(id);
	}
	public List<Staff> findAllStaff(){
		return memberMapper.findAllStaff();
	}
	public int addStaff(MemberQueryDTO memberQueryDTO){
		return memberMapper.addStaff(memberQueryDTO);
	}
}
