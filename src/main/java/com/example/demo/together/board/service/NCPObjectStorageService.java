<<<<<<<< HEAD:src/main/java/com/example/demo/together/common/utils/board/NCPObjectStorageService.java
package com.example.demo.together.common.utils.board;
========
package com.example.demo.together.board.service;
>>>>>>>> c876f3d9032582c0e225ea346c52713414c7d090:src/main/java/com/example/demo/together/board/service/NCPObjectStorageService.java

import java.io.InputStream;
import java.util.UUID;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.model.*;
<<<<<<<< HEAD:src/main/java/com/example/demo/together/common/utils/board/NCPObjectStorageService.java
import com.example.demo.together.common.conf.NcpConfiguration;
========
import com.example.demo.together.common.conf.NaverConfiguration;
>>>>>>>> c876f3d9032582c0e225ea346c52713414c7d090:src/main/java/com/example/demo/together/board/service/NCPObjectStorageService.java
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;


@Service
public class NCPObjectStorageService implements ObjectStorageService {
    final AmazonS3 s3;
    private String bucketName = "togetbucket";

    //constructor
    public NCPObjectStorageService(NcpConfiguration naverConfiguration) {
        s3 = AmazonS3ClientBuilder
                .standard()
                .withEndpointConfiguration(
                        new AwsClientBuilder
                            .EndpointConfiguration(naverConfiguration.getEndPoint(),
                                    naverConfiguration.getRegionName())
                )
                .withCredentials(new AWSStaticCredentialsProvider(
                                    new BasicAWSCredentials(naverConfiguration.getAccessKey(),
                                                            naverConfiguration.getSecretKey())
                                    )
                )
                .build();
    }

    //원하는 폴더에 이미지 파일 업로드
    @Override
    public String uploadFile(String directoryPath, MultipartFile img) {
        //System.out.println("NCP 이미지 업로드합니다.");
        if(img.isEmpty()) return null;

        try(InputStream fileIn = img.getInputStream()) {
            //String fileName = img.getOriginalFilename();
            String fileName = UUID.randomUUID().toString();

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(img.getContentType());
            objectMetadata.setContentLength(img.getSize()); // 콘텐츠 길이 설정: 메모리 부족 오류 방지

            PutObjectRequest objectRequest =
                new PutObjectRequest(bucketName,
                                    directoryPath + fileName,
                                    fileIn,
                                    objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead);
            s3.putObject(objectRequest);

            return fileName;

        }catch(Exception e) {
            throw new RuntimeException("파일 업로드 오류", e);
        }
    }//uploadFile

    //특정 폴더 내 이미지 삭제.
    @Override
    public void deleteObject(String uuid, String directoryPath) {
        try {
            s3.deleteObject(new DeleteObjectRequest(bucketName+"/"+directoryPath, uuid));
            //System.out.println("이미지 " + uuid + " 삭제 완료.");
        } catch (AmazonServiceException e) {
            throw new RuntimeException("이미지 삭제 오류", e);
        }
    }//deleteObject

    //폴더 간 이미지 이동.
    @Override
    public void moveFile(String tempDirectoryPath, String testDirectoryPath, String imageName) {
        System.out.println("파일이동할게요" );
        String sourceKey = tempDirectoryPath + imageName;
        String destinationKey = testDirectoryPath + imageName;

        try { //temp 파일 -> test 파일
            if(!tempDirectoryPath.equals(testDirectoryPath)){
                System.out.println("파일 " + imageName + "을(를) " + sourceKey + "-> " + destinationKey + "로 이동하겠습니다.");
                CopyObjectRequest copyObjRequest = new CopyObjectRequest(bucketName, sourceKey, bucketName, destinationKey)
                        .withMetadataDirective("COPY");
                s3.copyObject(copyObjRequest);
                // 이동된 파일에 대해 공개 읽기 권한 설정
                s3.setObjectAcl(bucketName, destinationKey, CannedAccessControlList.PublicRead);

                //temp 파일 삭제
                s3.deleteObject(new DeleteObjectRequest(bucketName, sourceKey));
                //System.out.println("원본 위치의 파일 " + imageName + " 삭제 완료.");
            }

        } catch (AmazonServiceException e) {
            throw new RuntimeException("파일 이동 중 오류 발생", e);
        }
    }//moveFile

    //ncp 서버 temp/특정 날짜 내 모든 파일 삭제
    @Override
    public void deleteDirectory(String tempDirectory) {
        // tempDirectory가 비어있지 않은지 확인합니다.
        if (tempDirectory == null || tempDirectory.isEmpty()) {
            return;
        }
        // 마지막으로 슬래시(/)가 없으면 추가합니다. 이것은 폴더 구조를 지정합니다.
        if (!tempDirectory.endsWith("/")) {
            tempDirectory += "/";
        }

        // 해당 디렉토리 안의 모든 객체를 나열합니다.
        ObjectListing objectListing = s3.listObjects(bucketName, tempDirectory);
        while (true) {
            for (S3ObjectSummary file : objectListing.getObjectSummaries()) {
                // 각 파일(객체)을 삭제합니다.
                s3.deleteObject(bucketName, file.getKey());
            }

            // 더 많은 객체가 있는지 확인합니다. 있다면 계속 처리합니다.
            if (objectListing.isTruncated()) {
                objectListing = s3.listNextBatchOfObjects(objectListing);
            } else {
                break;
            }
        }
        System.out.println(tempDirectory + " 내의 모든 파일 삭제 완료.");
    }

}
