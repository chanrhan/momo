package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.service.AdminService;
import com.momo.service.ShopService;
import com.momo.service.UserService;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.vo.SearchVO;
import com.momo.common.vo.ShopVO;
import com.momo.common.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
@PreAuthorize("isAuthenticated()")
@Deprecated
public class AdminController0 {
	private final AdminService      adminService;
	private final UserService       userService;
	private final ShopService shopService;


}
