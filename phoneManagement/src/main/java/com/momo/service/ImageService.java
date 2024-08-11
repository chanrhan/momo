package com.momo.service;

import com.momo.common.util.FileServiceUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
public class ImageService {
	public byte[] download(String dir,String path) throws IOException {
		UrlResource resource = FileServiceUtil.getUrlResource(dir, path);
		if(!resource.exists()){
			return null;
		}
		return Files.readAllBytes(resource.getFile().toPath());
	}

	public ResponseEntity<?> downloadResource(String dir, String fileName) throws IOException {
		String str = URLEncoder.encode(fileName, StandardCharsets.UTF_8);
		str = str.replaceAll("\\+","%20");

		Path path = Paths.get(FileServiceUtil.getFilePath(dir,fileName));
		Resource resource = new InputStreamResource(Files.newInputStream(path));


		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_TYPE, "application/octect-stream")
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename="+str+";")
				.body(resource);
	}

	public String upload(String dir, MultipartFile mf) {
		if (mf == null || mf.isEmpty()) {
			return null;
		}

		String fileName = FileServiceUtil.createSaveFileName(mf);
		String formatName = FileServiceUtil.extractExt(fileName);
		long fileSize = mf.getSize();
		String savePath = FileServiceUtil.getFileSavePath(dir);

		if(!new File(savePath).exists()){
			log.info(savePath+" is not existed..");
			log.info("Try to create a new directory: {}", savePath);
			try {
				new File(savePath).mkdir();
			}catch (Exception e){
				throw new IllegalArgumentException("디렉토리 생성에 실패하였습니다.");
			}
		}

		String filePath = savePath + fileName;

		try{
			FileServiceUtil.resizeImageAndSave(mf, filePath, formatName);
//			FileServiceUtil.compress(mf.getInputStream(), filePath);
//			mf.transferTo(FileServiceUtil.compressWithThumbnails(mf.getInputStream(), filePath));
		}catch (IOException e){
			log.error("파일 저장에 실패하였습니다. "+e.getMessage());
			e.printStackTrace();
			return null;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		log.info("파일 저장에 성공하였습니다: {}", filePath);
		return fileName;
	}
}
