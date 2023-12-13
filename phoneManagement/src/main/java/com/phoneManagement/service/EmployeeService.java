package com.phoneManagement.service;

import com.phoneManagement.domain.user.Employee;
import com.phoneManagement.dto.EmployeeDTO;
import com.phoneManagement.mapper.EmployeeMapper;
import com.phoneManagement.role.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService implements UserDetailsService, DefaultCRUDService<Employee, EmployeeDTO> {
	private final EmployeeMapper employeeMapper;

	@Override
	public UserDetails loadUserByUsername(String emp_id) throws UsernameNotFoundException {
		Employee employee = employeeMapper.select(emp_id);
		if(employee == null){
			throw new UsernameNotFoundException(String.format("Employee {%s} Not Founded!",emp_id));
		}

		List<GrantedAuthority> authorities =new ArrayList<>();
		if(employee.getRole() == UserRole.Director){
			authorities.add(new SimpleGrantedAuthority(UserRole.Director.toString()));
		}else{
			authorities.add(new SimpleGrantedAuthority(UserRole.Manager.toString()));
		}

		return new Employee(employee.getUsername(), employee.getPassword(), authorities);
	}

	@Override
	public int insert(EmployeeDTO employeeDTO){
		return employeeMapper.insert(employeeDTO);
	}

	@Override
	public int update(EmployeeDTO employeeDTO){
		int result=0;
		String pwd = employeeMapper.select(employeeDTO.getEmp_id()).getPassword();
		if(!pwd.equals("") && pwd.equals(employeeDTO.getEmp_pwd())){
			result = employeeMapper.update(employeeDTO);
		}
		return result;
	}

	@Override
	public int delete(EmployeeDTO employeeDTO){
		int result=0;
		String pwd = employeeMapper.select(employeeDTO.getEmp_id()).getPassword();
		if(!pwd.equals("") && pwd.equals(employeeDTO.getEmp_pwd())){
			result = employeeMapper.delete(employeeDTO);
		}
		return result;
	}

	public Employee select(String id){
		return employeeMapper.select(id);
	}

	@Override
	public List<Employee> selectAll() {
		return employeeMapper.selectAll();
	}





}
