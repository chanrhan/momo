package com.momo.mapper;

import com.momo.dto.CustomerDTO;
import com.momo.dto.EmployeeDTO;
import com.momo.vo.EmployeeVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmployeeMapper extends DefaultCRUDMapper<EmployeeVO, EmployeeDTO> {
	public EmployeeVO selectById(String id);
	public EmployeeVO selectByEmail(String email);
	public String selectPasswordById(String id);
	public int updatePassword(EmployeeDTO employeeDTO);
}
