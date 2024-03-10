package com.momo.service;

import com.momo.util.FileServiceUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class ImageService {

	public ResponseEntity<?> download(String path) throws IOException {
		UrlResource resource = FileServiceUtil.getFileResource(path);
		if(!resource.exists()){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		byte[] byteArray = Files.readAllBytes(resource.getFile().toPath());

		return new ResponseEntity<>(byteArray, HttpStatus.OK);
	}

	public String upload(MultipartFile mf) {
		if (mf.isEmpty()) {
			return null;
		}

		String fileName = FileServiceUtil.createSaveFileName(mf);
		String formatName = FileServiceUtil.extractExt(fileName);
		long fileSize = mf.getSize();
		String savePath = "C:" + FileServiceUtil.LOCAL_STORAGE_PATH;

		if(!new File(savePath).exists()){
			log.info(savePath+" is not existed");
			try {
				new File(savePath).mkdir();
			}catch (Exception e){
				throw new IllegalArgumentException("디렉토리 생성에 실패하였습니다.");
			}
		}

		String filePath = savePath + "/" + fileName;
//		try{
//			new File(filePath).createNewFile();
//		} catch (IOException e) {
//			log.error("파일 생성에 실패하였습니다. "+e.getMessage());
//			throw new RuntimeException(e);
//		}

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

		Map<String,Object> fileInfo = new HashMap<>();
		fileInfo.put("filePath",savePath);
		fileInfo.put("fileName", fileName);
		fileInfo.put("fileSize",fileSize);

//		log.info("Save File: "+fileInfo);

		return fileName;
	}
}
