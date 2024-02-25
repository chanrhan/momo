package com.momo.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Component
@Slf4j
public class FileGenerator {
	public void save(MultipartFile file, Path destFile) throws Exception {
		try(InputStream inputStream = file.getInputStream()){
			Files.copy(inputStream, destFile, StandardCopyOption.REPLACE_EXISTING);
		}catch (IOException e){
			log.error("file save error = {}", e.getMessage());
			throw new Exception();
		}
	}
}
