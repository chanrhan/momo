package com.momo.api;

import com.momo.service.ImageService;
import com.momo.service.SaleService;
import com.momo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/img")
public class ImageController {
	private final ImageService imageService;
	private final UserService  userService;
	private final SaleService  saleService;

	@PostMapping("/upload")
	@ResponseBody
	public ResponseEntity<String> upload(@RequestPart MultipartFile file) {
		return ResponseEntity.ok(imageService.upload("spec", file));
	}

	@GetMapping("/spec/{id}")
	@ResponseBody
	public ResponseEntity<byte[]> downloadSpecImage(@PathVariable int id) throws IOException {
		String path = saleService.getSpecFilePath(id);
		if(!StringUtils.hasText(path)){
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
		return imageService.download("spec",path);
	}


}
