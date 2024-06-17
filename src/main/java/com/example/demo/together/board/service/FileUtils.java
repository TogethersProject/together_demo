<<<<<<<< HEAD:src/main/java/com/example/demo/together/common/utils/board/FileUtils.java
package com.example.demo.together.common.utils.board;
========
package com.example.demo.together.board.service;
>>>>>>>> c876f3d9032582c0e225ea346c52713414c7d090:src/main/java/com/example/demo/together/board/service/FileUtils.java

import org.springframework.stereotype.Component;
//import jakarta.servlet.ServletContext;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class FileUtils {
//    @Autowired
//    private ServletContext ctx;
//    @Autowired
//    private ObjectStorageService objectStorageService;

    private String serverPath="https://kr.object.ncloudstorage.com/";
    private String bucketName = "togetbucket/";//버킷 이름
//    private String tempDir = "temp/";//임시 폴더 이름
//    private String testDir = "test/";//영구 폴더 이름


    // 날짜폴더 생성을위한 날짜정보
    public static String getDateFolder() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();

        String str = sdf.format(date);  // 예>"2023-11-02"

        // File.separator : 각 OS별로 경로구분자를 반환
        // 유닉스, 맥, 리눅스 구분자 /  예>"2023-11-02" -> "2023/11/02"
        // 윈도우즈  구분자 \  예>"2023-11-02"  ->  예>"2023\11\02"
        return str.replace("-", File.separator);
    }


    //글 내용 img 태그 내 src 정보 수정 (temp <-> test). startDirectory -> destinationDirectory.
    public String urlDirectoryChange(String startDirectory, String destinationDirectory,String content){
        return content.replace(
                serverPath + bucketName + startDirectory,
                serverPath + bucketName + destinationDirectory);
    }

    //content에서 uuid 추출
    public List<String> extractImageUuids(String content, String directoryPath) {
        List<String> uuids = new ArrayList<>();
        if(content == null){
            System.out.println("content가 비어있습니다. 글 내용을 넣어주세요.");
            return uuids;
        }

        String path = serverPath + bucketName + directoryPath;
        //System.out.println(uuids + "path(uuid추출):" + path);

        // uuid 추출을 위한 정규식
        Pattern pattern = Pattern.compile(path + "/([\\w-]+)(\\.jpg|\\.png|\\.jpeg|\\.gif)?");
        //System.out.println("pattern: " + pattern);
        Matcher matcher = pattern.matcher(content);

        while (matcher.find()) {
            String uuid = matcher.group(1); // uuid 추출
            //System.out.println("uuid추출해 리스트에 넣을 거임: " + uuid);
            if (uuid != null && !uuid.isEmpty()) {
                uuids.add(uuid); // UUID 저장
                //System.out.println("uuid 넣었음");
            }
        }

        //System.out.println("uuid:" + uuids);
        return uuids;
    }



    // 확장자 얻어오기
    public String getExt(String fileNm) {
        return fileNm.substring(fileNm.lastIndexOf(".") + 1);
    }

}
