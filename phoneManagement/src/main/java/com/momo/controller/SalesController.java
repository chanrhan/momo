package com.momo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/sales")
public class SalesController {
	@GetMapping("")
	public String salesHome(){
		return "sales/sales_home";
	}
}
