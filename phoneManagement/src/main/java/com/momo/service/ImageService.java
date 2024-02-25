package com.momo.service;

import com.momo.util.FileServiceUtil;
import javassist.bytecode.ByteArray;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.io.Resources;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class ImageService {

	public ResponseEntity<?> download(String path) throws IOException {
		UrlResource resource = FileServiceUtil.getFileResource(path);
		byte[] byteArray = Files.readAllBytes(resource.getFile().toPath());

		return new ResponseEntity<>(byteArray, HttpStatus.OK);
	}

	public String upload(MultipartFile mf) {
		if (mf.isEmpty()) {
			return null;
		}

		String fileName = FileServiceUtil.createSaveFileName(mf.getOriginalFilename());
		long fileSize = mf.getSize();
		String savePath = FileServiceUtil.getSaveFilePath(fileName);
		log.info("save path: "+savePath);
		File file = new File(savePath);

		if(file.exists()){
			return null;
		}

		if(file.getParentFile().mkdirs()){
			try{
				file.createNewFile();
			}catch (IOException e){
				e.printStackTrace();
				return null;
			}
		}

		try{
			mf.transferTo(file);
		}catch (IOException e){
			e.printStackTrace();
			return null;
		}

		Map<String,Object> fileInfo = new HashMap<>();
		fileInfo.put("filePath",savePath);
		fileInfo.put("fileName", fileName);
		fileInfo.put("fileSize",fileSize);

		log.info("Save File: "+fileInfo);

		return fileName;
	}
}
