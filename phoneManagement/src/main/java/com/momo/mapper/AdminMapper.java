package com.momo.mapper;

import com.momo.dto.AdminDTO;
import com.momo.vo.AdminVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper extends DefaultCRUDMapper<AdminVO, AdminDTO> {
	public AdminVO selectById(String id);
	public AdminVO selectByEmail(String email);
	public String selectPasswordById(String id);

	public int updatePassword(AdminDTO adminDTO);
}
