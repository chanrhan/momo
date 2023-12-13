package com.phoneManagement.mapper;

import com.phoneManagement.domain.user.Admin;
import com.phoneManagement.dto.AdminDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper extends DefaultCRUDMapper<Admin, AdminDTO> {
	public Admin select(String id);
}
