package com.momo.service;

import com.momo.dto.AdminDTO;
import com.momo.mapper.AdminMapper;
import com.momo.vo.AdminVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService implements DefaultCRUDService<AdminVO, AdminDTO> {
	private final AdminMapper adminMapper;
	private final PasswordEncoder passwordEncoder;

	public List<AdminVO> search(AdminDTO adminDTO){
		return adminMapper.search(adminDTO);
	}

	@Override
	public int insert(AdminDTO adminDTO){
		adminDTO.setPwd(passwordEncoder.encode(adminDTO.getPwd()));
		return adminMapper.insert(adminDTO);
	}

	@Override
	public int update(AdminDTO adminDTO){
		return adminMapper.update(adminDTO);
	}


	public int updatePassword(AdminDTO adminDTO){
		int result = 0;
		String pwd = adminMapper.selectById(adminDTO.getId()).getAdminPwd();
		if(pwd != null && !pwd.equals("") && passwordEncoder.matches(adminDTO.getPwd(), pwd)){
			adminDTO.setPwd(pwd);
			adminDTO.setUpdatePwd(passwordEncoder.encode(adminDTO.getUpdatePwd()));
			result = adminMapper.updatePassword(adminDTO);
		}
		return result;
	}

	@Override
	public int delete(AdminDTO adminDTO){
		int result=0;
		String pwd = adminMapper.selectById(adminDTO.getId()).getAdminPwd();
		if(!pwd.equals("") && pwd.equals(adminDTO.getPwd())){
			result = adminMapper.delete(adminDTO);
		}
		return result;
	}

	public AdminVO selectById(AdminDTO adminDTO){
		return adminMapper.selectById(adminDTO.getId());
	}

	public AdminVO selectById(String id){
		return adminMapper.selectById(id);
	}

	public AdminVO selectByEmail(String email){
		return adminMapper.selectByEmail(email);
	}

	public String selectPasswordById(String id){
		return adminMapper.selectPasswordById(id);
	}

	@Override
	public List<AdminVO> selectAll() {
		return adminMapper.selectAll();
	}
}
