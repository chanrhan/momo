package com.momo.controller;

import com.momo.service.EmployeeService;
import com.momo.service.RegionService;
import com.momo.service.ShopService;
import com.momo.vo.ShopVO;
import com.momo.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/shop")
@PreAuthorize("isAuthenticated()")
public class ShopController {
	private final ShopService shopService;
	private final RegionService regionService;

	private final EmployeeService employeeService;

	@GetMapping("")
	public String shopHome(){
		return "shop/home";
	}

	@GetMapping("/branch")
	public String shopBranch(Model model){
		model.addAttribute("list_state", regionService.selectAllState());
		return "shop/shop_branch";
	}

	@PostMapping("/create")
	@ResponseBody
	public boolean shopCreate(@RequestBody Map<String,Object> map){
		Map<String,Object> repsMap = employeeService.selectById(map.get("reps_id").toString());
		map.put("b_no", repsMap.get("b_no"));
		map.put("shop_cd",shopService.getMaxCode()+1);

		return shopService.insert(map) != 0;
	}

	@GetMapping("/city")
	@ResponseBody
	public String[] getCitiesByState(@RequestParam String state){
		return regionService.selectByState(state).split(",");
	}
}
