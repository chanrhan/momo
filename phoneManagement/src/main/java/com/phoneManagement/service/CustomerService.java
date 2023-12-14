package com.phoneManagement.service;

import com.phoneManagement.domain.user.Customer;
import com.phoneManagement.dto.CustomerDTO;
import com.phoneManagement.mapper.CustomerMapper;
import com.phoneManagement.role.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService implements UserDetailsService, DefaultCRUDService<Customer, CustomerDTO> {
	private final CustomerMapper customerMapper;
	private final PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String cust_id) throws UsernameNotFoundException {
		Customer customer = customerMapper.select(cust_id);
		if(customer == null){
			throw new UsernameNotFoundException(String.format("Customer {%s} Not Founded!",cust_id));
		}

		List<GrantedAuthority> authorities =new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(UserRole.Customer.toString()));

		return new Customer(customer.getUsername(), customer.getPassword(), authorities);
	}

	@Override
	public int insert(CustomerDTO customerDTO){
		customerDTO.setPwd(passwordEncoder.encode(customerDTO.getPwd()));
		return customerMapper.insert(customerDTO);
	}

	@Override
	public int update(CustomerDTO customerDTO){
		int result=0;
		String pwd = customerMapper.select(customerDTO.getId()).getPassword();
		if(!pwd.equals("") && pwd.equals(customerDTO.getPwd())){
			result = customerMapper.update(customerDTO);
		}
		return result;
	}

	@Override
	public int delete(CustomerDTO customerDTO){
		int result=0;
		String pwd = customerMapper.select(customerDTO.getId()).getPassword();
		if(!pwd.equals("") && pwd.equals(customerDTO.getPwd())){
			result = customerMapper.delete(customerDTO);
		}
		return result;
	}

	public Customer select(String id){
		return customerMapper.select(id);
	}


	@Override
	public List<Customer> selectAll() {
		return customerMapper.selectAll();
	}

}
