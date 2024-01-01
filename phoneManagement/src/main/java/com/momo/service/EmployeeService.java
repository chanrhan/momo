package com.momo.service;

import com.momo.dto.CustomerDTO;
import com.momo.dto.EmployeeDTO;
import com.momo.mapper.EmployeeMapper;
import com.momo.vo.EmployeeVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService implements DefaultCRUDService<EmployeeVO, EmployeeDTO> {
	private final EmployeeMapper employeeMapper;
	private final PasswordEncoder passwordEncoder;

	public List<EmployeeVO> search(EmployeeDTO employeeDTO){
		return employeeMapper.search(employeeDTO);
	}
	@Override
	public int insert(EmployeeDTO employeeDTO){
		employeeDTO.setPwd(passwordEncoder.encode(employeeDTO.getPwd()));
		return employeeMapper.insert(employeeDTO);
	}

	@Override
	public int update(EmployeeDTO employeeDTO){
		return employeeMapper.update(employeeDTO);
	}

	public int updatePassword(EmployeeDTO employeeDTO){
		int result = 0;
		String pwd = employeeMapper.selectById(employeeDTO.getId()).getEmpPwd();
		if(pwd != null && !pwd.equals("") && passwordEncoder.matches(employeeDTO.getPwd(), pwd)){
			employeeDTO.setPwd(pwd);
			employeeDTO.setUpdatePwd(passwordEncoder.encode(employeeDTO.getUpdatePwd()));
			result = employeeMapper.updatePassword(employeeDTO);
		}
		return result;
	}


	@Override
	public int delete(EmployeeDTO employeeDTO){
		return employeeMapper.delete(employeeDTO);
	}

	public EmployeeVO selectById(String id){
		return employeeMapper.selectById(id);
	}
	public EmployeeVO selectByEmail(String email){
		return employeeMapper.selectByEmail(email);
	}
	@Override
	public List<EmployeeVO> selectAll() {
		return employeeMapper.selectAll();
	}





}
