package com.momo.controller;

import com.momo.util.AddressAreaApiResponse;
import com.momo.util.AddressAreaApiUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/zipcode")
public class ZipCodeController {
	@GetMapping("/window/open")
	public String zipCodeWindowOpen(){
		return "account/zipCode";
	}

	@GetMapping("/getaddress")
	@ResponseBody
	public Map<String, AddressAreaApiResponse> getAddressArea(@RequestParam String srchwrd,
															  @RequestParam String countPerPage,
															  @RequestParam String currentPage){
		return AddressAreaApiUtil.getAddressArea(srchwrd, countPerPage, currentPage);
	}
}
