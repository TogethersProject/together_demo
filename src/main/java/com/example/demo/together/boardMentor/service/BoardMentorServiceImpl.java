package com.example.demo.together.boardMentor.service;


import com.example.demo.together.boardMentor.DAO.BoardMentorDAO;
import com.example.demo.together.boardMentor.bean.BoardMentorDTO;
import com.example.demo.together.common.utils.board.FileUtils;
import com.example.demo.together.common.utils.board.ObjectStorageService;
import com.example.demo.together.member.DAO.MemberDAO;
import com.example.demo.together.member.bean.MemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Transactional(readOnly = false)
@Service
public class BoardMentorServiceImpl implements BoardMentorService {
    @Autowired
    private ObjectStorageService objectStorageService;
    @Autowired
    private FileUtils fUtils;
    @Autowired
    private BoardMentorDAO boardDAO;
    @Autowired
    private MemberDAO memberDAO;

    private String serverPath="https://kr.object.ncloudstorage.com/";
    private String bucketName = "togetbucket/";//버킷 이름
    private String tempDir = "mentor/temp/";//임시 폴더 이름
    private String testDir = "mentor/board/";//영구 폴더 이름


    @Override
    public void writeBoard(BoardMentorDTO boardDTO) {
        System.out.println("글작성 서비스 진입");
        String tempDir = "mentor/temp";
        String testDir = "mentor/board";
        //img 태그 내 폴더 temp -> test로 바꾸어 경로 변경
        String content = boardDTO.getContent();
        boardDTO.setContent(fUtils.urlDirectoryChange(tempDir, testDir, content));

        //멘토(글 작성자) 정보 입력
        Optional<MemberDTO> memberDTOTemp = memberDAO.findById(boardDTO.getId());
        MemberDTO memberDTO = memberDTOTemp.get();
        boardDTO.setName(memberDTO.getMember_name());
        boardDTO.setEmail(memberDTO.getMember_email());

        System.out.println("글작성:"+ boardDTO);

        //변경 내용대로 글작성
        this.boardDAO.save(boardDTO);
    }

    @Override
    //이미지 temp -> Test 이동
    public void writeImageToTest(String content, String boardTime){
        System.out.println("글 작성일(writeImageToTest):"+boardTime);

        //content에서 img 태그 안에 있는 이미지의 uuid를 꺼내 리스트에 담음
        List<String> imageNames = fUtils.extractImageUuids(content,tempDir+boardTime);

        //test로 이미지 이동
        String startDir = tempDir+boardTime+"/";
        String destinationDir = testDir+boardTime+"/";
        for (String imageName : imageNames) {
            System.out.println("이미지 이동 시작");
            objectStorageService.moveFile(startDir, destinationDir, imageName);
        }
        System.out.println("이미지 이동 완료 - 개수: "+ imageNames.toArray().length);
    }

    //글 목록 정보 전달
    @Override
    public Page<BoardMentorDTO> getWriteList(Pageable pageable) {
        Page<BoardMentorDTO> list = boardDAO.findAll(pageable);
        return list;
    }

    //글 작성 중에 업로드한 이미지 파일을 저장. temp 폴더에 이미지 저장
    @Override
    public Map<String, Object> uploadImageToTemp(MultipartFile img) throws Exception {
        Map<String, Object> map = new HashMap<>();
        String directoryPath = tempDir;
        // temp/yyyMMdd
        directoryPath += fUtils.getDateFolder() +"/";
        String ctnImg = objectStorageService.uploadFile(directoryPath,img);

        map.put("uploaded", 1);
        map.put("fileName",ctnImg);
        map.put("url", serverPath+bucketName+directoryPath+ctnImg);

        return map;
    }

    //글 삭제. 글 내부 이미지 삭제 -> 글 내용 삭제.
    @Override
    public String deleteBoard(BigInteger seq, String member_id) {
        //Board 테이블에서 content 및 폴더 추출
        Optional<BoardMentorDTO> boardDTOOptional = boardDAO.findById(seq);
        BoardMentorDTO boardDTO = boardDTOOptional.get();
        String memberId = boardDTO.getId();
        if(!memberId.equals(member_id)){
            return "아이디가 일치하지 않습니다.";
        }
        String content = boardDTO.getContent();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String boardTime= dateFormat.format(boardDTO.getBoard_time());//Date -> yyyyMMdd의 String

        //content에서 이미지 uuid 탐색하여 리스트에 담음
        List<String> imageUuidList = fUtils.extractImageUuids(content,testDir+boardTime);

        //ncp에서 해당 이미지 삭제
        for (String uuid : imageUuidList) {
            objectStorageService.deleteObject( uuid,testDir+boardTime); // 이미지 삭제 메소드 호출 예시
        }

        //보드 테이블에서 글 삭제
        boardDAO.deleteById(seq);
        return "글을 삭제하였습니다.";
    }

    //글 수정을 위해 글 정보 및 이미지 정보 전달.
    @Override
    public Map<String, Object> getUpdateBoard(BigInteger seq, String member_id) {
        System.out.println("getBoard(Service)");
        Map<String, Object> map= new HashMap<>();

        //필요한 글 정보를 받음
        Optional<BoardMentorDTO> boardDTOOptional = boardDAO.findById(seq);
        
        if(boardDTOOptional != null){
            BoardMentorDTO boardDTO = boardDTOOptional.get();
            if(boardDTOOptional.get().getId().equals(member_id)){//글 작성자 = 글 수정자
                String content =boardDTO.getContent();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
                String boardTime = dateFormat.format(boardDTO.getBoard_time());//Date -> yyyyMMdd의 String

                //content에서 이미지 uuid 탐색하여 리스트에 담음
                List<String> imageNames = fUtils.extractImageUuids(content,testDir+boardTime);

                //map에 담음.
                map.put("boardDTO", Optional.of(boardDTO));//BoardDTO -> Optional<BoardDTO>
                map.put("imageList", imageNames);//처음에 가지고 있는 이미지 목록.
            }
            
        }

        return map;
    }//getUpdateBoard

    //글 수정: 새로 업로드한 이미지는 temp -> test 이동. 없앤 이미지는 test -> 삭제. 글 정보 수정하여 갱신.
    @Override
    public void updateBoard(List<String> imageNamesBefore, BoardMentorDTO boardDTO) {
        System.out.println("이미지 안쓸거니까 이제 없애고 수정한 글 저장한다 updateBoard(Service)");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        //이미지는 가장 최근에 갱신된 날짜 폴더에 모두 저장되어 있음. 갱신한 적이 없으면 첫 글 작성 날짜 폴더, 갱신한 적이 있으면 마지막으로 갱신한 날짜 폴더에서 이미지를 찾음.
        String boardTime= dateFormat.format( boardDTO.getBoard_lastTime() == null ? boardDTO.getBoard_time() : boardDTO.getBoard_lastTime());
        String boardTimeNew =  dateFormat.format(new Date());//오늘 날짜 yyyyMMdd

        //갱신한 내용에 없는 이미지 uuid 추출
        List<String> imageNamesOld = fUtils.extractImageUuids(boardDTO.getContent(),testDir+boardTime);//수정후에도 남아 있는 이미지
        List<String> imageNamesNew = fUtils.extractImageUuids(boardDTO.getContent(),tempDir+boardTimeNew);//새롭게 추가한 이미지
        for (String uuid : imageNamesBefore) {
            //수정하며 사라진 이미지 삭제
            if (!imageNamesOld.contains(uuid)) {
                //System.out.println("수정하며 사라진 이미지:"+uuid);
                //ncp에서 해당 이미지 삭제
                objectStorageService.deleteObject( uuid,testDir+boardTime);
            }
            else{//글에 원래 있던 이미지 이동
                objectStorageService.moveFile(testDir+boardTime+"/", testDir+boardTimeNew+"/", uuid);
            }
        }

        //글에 새롭게 추가한 이미지 저장
        for (String imageName : imageNamesNew) {
            //System.out.println("새로운 이미지 저장");
            objectStorageService.moveFile(tempDir+boardTimeNew+"/", testDir+boardTimeNew+"/", imageName);
        }

        //이미지 태그 내 src temp -> test
        boardDTO.setContent(fUtils.urlDirectoryChange(tempDir, testDir, boardDTO.getContent()));

        //글 수정본 저장. seq로 찾아서 content와 title를 덮어쓰기
        int seq = boardDTO.getSeq();
        String title = boardDTO.getTitle();
        String content = boardDTO.getContent();
        Timestamp boardTimePresent = new Timestamp(System.currentTimeMillis());//글 수정 시간.

        System.out.println("수정 보드내용: "+boardDTO+boardTime);
        boardDAO.updateBySeq(seq, title, content, boardTimePresent);
    }
}
