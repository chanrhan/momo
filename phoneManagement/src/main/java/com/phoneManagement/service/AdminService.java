package com.phoneManagement.service;

import com.phoneManagement.domain.user.Admin;
import com.phoneManagement.dto.AdminDTO;
import com.phoneManagement.mapper.AdminMapper;
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
public class AdminService implements UserDetailsService, DefaultCRUDService<Admin, AdminDTO> {
	private final AdminMapper adminMapper;

	public List<Admin> search(AdminDTO adminDTO){
		return adminMapper.search(adminDTO);
	}

	@Override
	public UserDetails loadUserByUsername(String admin_id) throws UsernameNotFoundException {
		Admin admin = adminMapper.select(admin_id);
		if(admin == null){
			throw new UsernameNotFoundException(String.format("Admin {%s} Not Founded!",admin_id));
		}

		List<GrantedAuthority> authorities =new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(UserRole.Admin.toString()));

		return new Admin(admin.getUsername(), admin.getPassword(), authorities);
	}

	@Override
	public int insert(AdminDTO adminDTO){
		return adminMapper.insert(adminDTO);
	}

	@Override
	public int update(AdminDTO adminDTO){
		int result=0;
		String pwd = adminMapper.select(adminDTO.getAdmin_id()).getPassword();
		if(!pwd.equals("") && pwd.equals(adminDTO.getAdmin_pwd())){
			result = adminMapper.update(adminDTO);
		}
		return result;
	}

	@Override
	public int delete(AdminDTO adminDTO){
		int result=0;
		String pwd = adminMapper.select(adminDTO.getAdmin_id()).getPassword();
		if(!pwd.equals("") && pwd.equals(adminDTO.getAdmin_pwd())){
			result = adminMapper.delete(adminDTO);
		}
		return result;
	}


	public Admin select(AdminDTO adminDTO){
		return adminMapper.select(adminDTO.getAdmin_id());
	}

	@Override
	public List<Admin> selectAll() {
		return adminMapper.selectAll();
	}
}
