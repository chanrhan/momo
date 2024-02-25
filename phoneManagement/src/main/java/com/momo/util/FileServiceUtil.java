package com.momo.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;

import java.net.MalformedURLException;
import java.util.UUID;

@Component
public class FileServiceUtil {
	public static String LOCAL_STORAGE_PATH;

	@Value("${file.path}") // @Value 어노테이션은 static 변수 위에 붙여서 쓰면 오류가 발생한다.
						   // 따라서 아래와 같이 Setter와 같이 사용한다.
	public void setLocalStoragePath(String path){
		LOCAL_STORAGE_PATH = path;
	}

	public static String createSaveFileName(String fileName){
		return UUID.randomUUID() + "." + extractExt(fileName);
	}

	public static String extractExt(String fileName){
		int pos = fileName.lastIndexOf(".");
		return fileName.substring(pos + 1);
	}

	public static UrlResource getFileResource(String path) throws MalformedURLException {
		return new UrlResource("file:" + LOCAL_STORAGE_PATH + path);
	}

	public static String getSaveFilePath(String fileName){
		return "C:" + LOCAL_STORAGE_PATH + fileName;
	}
}
