package com.momo.service;

import com.momo.common.util.FileServiceUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
@Slf4j
public class ImageService {
	public ResponseEntity<byte[]> download(String dir,String path) throws IOException {
		UrlResource resource = FileServiceUtil.getFileResource(dir, path);
		if(!resource.exists()){
			return ResponseEntity.notFound().build();
		}
		byte[] byteArray = Files.readAllBytes(resource.getFile().toPath());

		return ResponseEntity.ok(byteArray);
	}

	public String upload(String dir, MultipartFile mf) {
		if (mf.isEmpty()) {
			return null;
		}

		String fileName = FileServiceUtil.createSaveFileName(mf);
		String formatName = FileServiceUtil.extractExt(fileName);
		long fileSize = mf.getSize();
		String savePath = FileServiceUtil.getFileSavePath(dir);

//		if(!new File(savePath).exists()){
//			log.info(savePath+" is not existed");
//			try {
//				new File(savePath).mkdir();
//			}catch (Exception e){
//				throw new IllegalArgumentException("디렉토리 생성에 실패하였습니다.");
//			}
//		}

		String filePath = savePath + "/" + fileName;

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
		return fileName;
	}
}
