package com.momo.service;

import com.momo.dto.AdminDTO;
import com.momo.dto.CustomerDTO;
import com.momo.mapper.CustomerMapper;
import com.momo.vo.CustomerVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService implements DefaultCRUDService<CustomerVO, CustomerDTO> {
	private final CustomerMapper customerMapper;
	private final PasswordEncoder passwordEncoder;

	public List<CustomerVO> search(CustomerDTO customerDTO){
		return customerMapper.search(customerDTO);
	}

	@Override
	public int insert(CustomerDTO customerDTO){
		customerDTO.setPwd(passwordEncoder.encode(customerDTO.getPwd()));
		return customerMapper.insert(customerDTO);
	}

	@Override
	public int update(CustomerDTO customerDTO){
		return customerMapper.update(customerDTO);
	}

	public int updatePassword(CustomerDTO customerDTO){
		int result = 0;
		String pwd = customerMapper.selectById(customerDTO.getId()).getCustPwd();
		if(pwd != null && !pwd.equals("") && passwordEncoder.matches(customerDTO.getPwd(), pwd)){
			customerDTO.setPwd(pwd);
			customerDTO.setUpdatePwd(passwordEncoder.encode(customerDTO.getUpdatePwd()));
			result = customerMapper.updatePassword(customerDTO);
		}
		return result;
	}

	@Override
	public int delete(CustomerDTO customerDTO){
		return customerMapper.delete(customerDTO);
	}

	public CustomerVO selectById(String id){
		return customerMapper.selectById(id);
	}

	public CustomerVO selectByEmail(String email){
		return customerMapper.selectByEmail(email);
	}

	@Override
	public List<CustomerVO> selectAll() {
		return customerMapper.selectAll();
	}

}
