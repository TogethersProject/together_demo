package com.example.demo.together.board.service;

import org.springframework.web.multipart.MultipartFile;

public interface ObjectStorageService {
	public String uploadFile(String directoryPath, MultipartFile img);
	public void deleteObject(String uuid, String directoryPath);

	void moveFile(String tempDirectoryPath, String testDirectoryPath, String imageName);
	void deleteDirectory(String tempDirectory);
}
