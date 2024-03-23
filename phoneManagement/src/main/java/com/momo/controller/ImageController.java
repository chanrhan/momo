package com.momo.controller;

import com.momo.service.ImageService;
import com.momo.service.SaleService;
import com.momo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/img")
public class ImageController {
	private final ImageService imageService;
	private final UserService  userService;
	private final SaleService  saleService;

	@PostMapping("/upload")
	@ResponseBody
	public String upload(@RequestPart MultipartFile file) {
		return imageService.upload("spec", file);
	}

	@GetMapping("/spec/{id}")
	@ResponseBody
	public ResponseEntity<?> downloadSpecImage(@PathVariable int id) throws IOException {
		String path = saleService.getSpecFilePath(id);
		return imageService.download("spec",path);
	}

	@GetMapping("/pfp/{id}")
	@ResponseBody
	public ResponseEntity<?> downloadPfpImage(@PathVariable String id) throws IOException {
		String path = userService.getPfpFilePath(id);
		return imageService.download("pfp",path);
	}
}
