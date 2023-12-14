package com.phoneManagement.service;

import com.phoneManagement.domain.user.Admin;
import com.phoneManagement.domain.user.Customer;
import com.phoneManagement.domain.user.Employee;
import com.phoneManagement.form.SignupForm;
import com.phoneManagement.mapper.AdminMapper;
import com.phoneManagement.role.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {
	private final AdminService adminService;
	private final CustomerService customerService;
	private final EmployeeService employeeService;

	public void signup(SignupForm signupForm){
		UserRole role = Enum.valueOf(UserRole.class, signupForm.getRole());
		switch (role){
			case Admin:
				adminService.insert(signupForm.getAdminDTO());
				break;
			case Customer:
				customerService.insert(signupForm.getCustomerDTO());
				break;
			default:
				employeeService.insert(signupForm.getEmployeeDTO());
				break;
		}
	}

	public UserDetails getUserById(String id){
		Admin admin = adminService.select(id);
		if(admin != null){
			return admin;
		}

		Customer customer = customerService.select(id);
		if(customer != null){
			return customer;
		}

		Employee employee = employeeService.select(id);
		if(employee != null){
			return employee;
		}

		return null;
	}
}
