package com.phoneManagement.controller;

import com.phoneManagement.form.LoginForm;
import com.phoneManagement.form.SignupForm;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {
	@GetMapping("/login")
	public String login(LoginForm loginForm){
		return "member/account/login";
	}

	@PostMapping("/login")
	public String login_form(Model model, @Valid LoginForm loginForm, Errors errors){
		System.out.println("/login Post");
		if(errors.hasErrors()){
//			if(loginDTO != null){
//				model.addAttribute("loginValue", loginDTO);
//			}
			return "member/account/login";
		}
		System.out.println(loginForm);
		return "redirect:/";
	}

	@GetMapping("/signup")
	public String signup(SignupForm signupForm){
		return "member/account/signup";
	}

	@PostMapping("/signup")
	public String signup_form(@Valid SignupForm signupForm, Errors errors){
		if(errors.hasErrors()){
			return "member/account/signup";
		}
		System.out.println(signupForm);
		return "redirect:/";
	}
}
