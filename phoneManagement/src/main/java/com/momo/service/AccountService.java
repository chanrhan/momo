package com.momo.service;

import com.momo.dto.AdminDTO;
import com.momo.dto.CustomerDTO;
import com.momo.dto.EmployeeDTO;
import com.momo.form.UserInfoForm;
import com.momo.role.UserRole;
import com.momo.vo.AdminVO;
import com.momo.vo.CustomerVO;
import com.momo.vo.EmployeeVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService implements UserDetailsService{
	private final PasswordEncoder passwordEncoder;

	private final AdminService adminService;
	private final CustomerService customerService;
	private final EmployeeService employeeService;

	public int update(UserInfoForm userInfoForm){
		UserRole role = Enum.valueOf(UserRole.class, userInfoForm.getRole());
		switch (role){
			case ADMIN:
				return adminService.update(userInfoForm.getAdminDTO());
			case CUSTOMER:
				return customerService.update(userInfoForm.getCustomerDTO());
			default:
				return employeeService.update(userInfoForm.getEmployeeDTO());
		}
	}

	public int updatePassword(UserInfoForm userInfoForm){
		UserRole role = Enum.valueOf(UserRole.class, userInfoForm.getRole());
		switch (role){
			case ADMIN:
				return adminService.updatePassword(userInfoForm.getAdminDTO());
			case CUSTOMER:
				return customerService.updatePassword(userInfoForm.getCustomerDTO());
			default:
				return employeeService.updatePassword(userInfoForm.getEmployeeDTO());
		}
	}

	public int signup(UserInfoForm userInfoForm){
		UserRole role = Enum.valueOf(UserRole.class, userInfoForm.getRole());
		switch (role){
			case ADMIN:
				return adminService.insert(userInfoForm.getAdminDTO());
			case CUSTOMER:
				return customerService.insert(userInfoForm.getCustomerDTO());
			default:
				return employeeService.insert(userInfoForm.getEmployeeDTO());
		}
	}

	public UserInfoForm getUserById(String id){
		List<AdminVO> adminVO = adminService.search(AdminDTO.builder().id(id).build());
		if(adminVO != null && !adminVO.isEmpty()){
			return adminVO.get(0).getUserInfoForm();
		}

		List<CustomerVO> customerVO = customerService.search(CustomerDTO.builder().id(id).build());
		if(customerVO != null && !customerVO.isEmpty()){
			return customerVO.get(0).getUserInfoForm();
		}

		List<EmployeeVO> employeeVO = employeeService.search(EmployeeDTO.builder().id(id).build());
		if(employeeVO != null && !employeeVO.isEmpty()){
			return employeeVO.get(0).getUserInfoForm();
		}

		return null;
	}

	public UserInfoForm getUserByEmail(String email){
		List<AdminVO> adminVO = adminService.search(AdminDTO.builder().email(email).build());
		if(adminVO != null && !adminVO.isEmpty()){
			return adminVO.get(0).getUserInfoForm();
		}

		List<CustomerVO> customerVO = customerService.search(CustomerDTO.builder().email(email).build());
		if(customerVO != null && !customerVO.isEmpty()){
			return customerVO.get(0).getUserInfoForm();
		}

		List<EmployeeVO> employeeVO = employeeService.search(EmployeeDTO.builder().email(email).build());
		if(employeeVO != null && !employeeVO.isEmpty()){
			return employeeVO.get(0).getUserInfoForm();
		}

		return null;
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserInfoForm user = getUserById(username);
		if(user == null){
			throw new UsernameNotFoundException(String.format("User {%s} Not Founded!",username));
		}

		return user.getUserDetailsImpl();
	}
}
