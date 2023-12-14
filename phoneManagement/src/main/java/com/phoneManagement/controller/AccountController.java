package com.phoneManagement.controller;

import com.phoneManagement.form.LoginForm;
import com.phoneManagement.form.SignupForm;
import com.phoneManagement.service.AccountService;
import com.phoneManagement.service.AdminService;
import com.phoneManagement.service.CustomerService;
import com.phoneManagement.service.EmployeeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {
	private final AccountService accountService;
	private final PasswordEncoder passwordEncoder;

	private final AdminService adminService;
	private final EmployeeService employeeService;
	private final CustomerService customerService;

	@GetMapping("/login")
	public String login(LoginForm loginForm){
		return "account/login";
	}

	@PostMapping("/login")
	public String loginForm(Model model, LoginForm loginForm){
		// 로그인 처리
		// Admin, Customer, Employee 데이터베이스를 모두 뒤져봐야 함
		// 3개의 유저 유형의 아이디가 서로 독립적이라면, 로그인 구분 칸을 만들어서
		// 관리자, 직원, 고객 셋 중 무엇으로 로그인할 지 선택해야 함
		// 하지만, 위 방식은 편의성이 너무 떨어짐
		// 결국 3개의 데이터베이스에서 ID의 중복이 없어야 함
		UserDetails userDetails = accountService.getUserById(loginForm.getId());
		if(userDetails == null){
			// 존재하지 않는 아이디
			return "account/login";
		}

		// 입력받은 비밀번호를 암호화하여, DB에 있는 암호화된 비밀번호와 비교
		String login_pwd = passwordEncoder.encode(loginForm.getPwd());
		String db_pwd = userDetails.getPassword();
		if(login_pwd == null || !login_pwd.equals(db_pwd)){
			// 일치하지 않는 비밀번호
			return "account/login";
		}

		return "redirect:/";
	}

	@GetMapping("/signup")
	public String signup(SignupForm signupForm){
		return "account/signup";
	}

	@PostMapping("/signup")
	public String signupForm(RedirectAttributes redirectAttributes, SignupForm signupForm){
		redirectAttributes.addFlashAttribute("formData", signupForm);

		return "redirect:/account/role";
	}

	@GetMapping("/role")
	public String roleSelect(Model model, HttpServletRequest request){
		Map<String, ?> flashMap = RequestContextUtils.getInputFlashMap(request);
		model.addAttribute("formData",(SignupForm) flashMap.get("formData"));

		return "account/role_select";
	}

	@PostMapping("/role")
	public String roleSelectForm(RedirectAttributes redirectAttributes, SignupForm signupForm){
		redirectAttributes.addFlashAttribute("formData", signupForm);

		return String.format("redirect:/account/role/%s",signupForm.getRole().toLowerCase());
	}

	@GetMapping("/role/{role}")
	public String employeeRole(Model model, @PathVariable String role, HttpServletRequest request){
		Map<String, ?> flashMap = RequestContextUtils.getInputFlashMap(request);
		model.addAttribute("formData",(SignupForm) flashMap.get("formData"));

		if(role.equalsIgnoreCase("Customer")){
			return "account/role_customer";
		}
		return "account/role_employee";
	}

	@PostMapping("/role/submit")
	public String roleSubmit(SignupForm signupForm){
		accountService.signup(signupForm);
		return "redirect:/";
	}


	// 아이디 중복체크 API
	@GetMapping("/dup/id")
	@ResponseBody
	public boolean checkDupId(@RequestParam("id")String id){
		return accountService.getUserById(id) == null;
	}

	// 이메일 중복체크 API
//	@GetMapping("/dup/email")
//	@ResponseBody
//	public boolean checkDupEmail(@RequestParam("email")String id){
//		return accountService.checkIdDuplication(id);
//	}
}
