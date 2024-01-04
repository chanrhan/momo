package com.momo.form;

import com.momo.domain.user.UserDetailsImpl;
import com.momo.dto.AdminDTO;
import com.momo.dto.CustomerDTO;
import com.momo.dto.EmployeeDTO;
import com.momo.dto.ShopDTO;
import com.momo.role.UserRole;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserInfoForm {
	private String role; // 역할
	private String id; // 아이디
	private String pwd; // 비밀번호
	private String updatePwd; // 변경할 비밀번호
	private String name; // 실명
	private String email; // 이메일
	private String tel; // 전화번호
	private String businessNo; //사업자등록번호
	private String businessName;   //사업자명
	private int    shopCode; // 매장 코드
	private String shopName; // 매장 이름
	private String shopAddr; // 매장 주소
	private String shopTel; // 매장 연락

	private String termString; // 약관동의 여부들

	private LocalDateTime regiDt;


	@Builder
	public UserInfoForm(String role, String id, String pwd, String name, String email, String tel, String termString, String businessNo, String businessName, int shopCode, String shopName, String shopAddr, String shopTel, LocalDateTime regiDt) {
		this.role         = role;
		this.id           = id;
		this.pwd          = pwd;
		this.name         = name;
		this.email        = email;
		this.tel          = tel;
		this.termString   = termString;
		this.businessNo   = businessNo;
		this.businessName = businessName;
		this.shopCode     = shopCode;
		this.shopName   = shopName;
		this.shopAddr   = shopAddr;
		this.shopTel    = shopTel;
		this.regiDt     = regiDt;
	}

	public AdminDTO getAdminDTO() {
		return AdminDTO.builder().id(id).pwd(pwd).updatePwd(updatePwd).name(name).email(email).tel(tel).regiDate(regiDt).build();
	}

	public CustomerDTO getCustomerDTO() {
		return CustomerDTO.builder().id(id).pwd(pwd).updatePwd(updatePwd).name(name).email(email).tel(tel).regiDate(regiDt).build();
	}

	public EmployeeDTO getEmployeeDTO() {
		return EmployeeDTO.builder().id(id).pwd(pwd).updatePwd(updatePwd).name(name).email(email).tel(tel).role(Enum.valueOf(UserRole.class, role)).shopCode(shopCode).regiDate(regiDt).build();
	}

	public ShopDTO getShopDTO() {
		return ShopDTO.builder().code(shopCode).addr(shopAddr).name(shopName).tel(shopTel).bNo(businessNo).build();
	}

	public UserDetailsImpl getUserDetailsImpl() {
		return UserDetailsImpl.builder().username(id).password(pwd).role(role.toUpperCase()).build();
	}


}
