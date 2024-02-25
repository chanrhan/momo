package com.momo.controller;

import com.momo.service.ImageService;
import com.momo.service.SaleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/img")
public class ImageController {
	private final ImageService imageService;
	private final SaleService saleService;

	@PostMapping("/upload")
	@ResponseBody
	public ResponseEntity<Map<String,Object>> upload(@RequestPart MultipartFile file) {
		return null;
	}

	@GetMapping("/spec/{id}")
	@ResponseBody
	public ResponseEntity<?> download(@PathVariable int id) throws IOException {
		String path = saleService.getSpecFilePath(id);
		return imageService.download(path);
	}
}
