package com.example.demo.together.boardMentor.controller;

import com.example.demo.together.boardMentor.bean.BoardMentorDTO;
import com.example.demo.together.common.utils.board.FileUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.demo.together.boardMentor.service.BoardMentorService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

//포트 번호가 달라서(front는 3000, back은 8080) 생기는 연결 거부 문제 해결
@CrossOrigin()
//직접적인 페이지 연결은 프론트에서 함으로 벡에서는 정보 전달을 위한 작업만 수행함.
@RestController
//접근경로
@RequestMapping(
        path = {"mentor"}
)
@RequiredArgsConstructor
public class BoardMentorController {
    private static final Logger log = LoggerFactory.getLogger(BoardMentorController.class);
    @Autowired
    private BoardMentorService boardService;

    @GetMapping(path="test1")
    public String test1(String str){
        System.out.println("테스트1 " + str);
        log.info("테스트1임당 " + str);
        return "test1 " + str;
    }
    @Secured("ROLE_USER")
    @GetMapping(path="test2")
    public String test2(String str){
        System.out.println("테스트2 " + str);
        log.info("테스트2임당 " + str);
        return "test2 " + str;
    }
    @GetMapping(path="test3")
    public String test3(String str){
        System.out.println("테스트3 " + str);
        log.info("테스트3임당 " + str);
        return "test3 " + str;
    }

    //게시글 작성. 작성 시 이미지를 temp -> test 폴더로 이동, 글 내용의 img 태그의 src를 갱신한다
    @Secured("ROLE_USER")
    @PostMapping(path = {"writeBoard"})
    public void writeBoard(@RequestBody BoardMentorDTO boardDTO) {
        System.out.println("글작성 컨트롤러 진입: " +boardDTO);

        FileUtils fileUtils = new FileUtils();
        try {
            //이미지를 임시폴더에서 영구폴더로 옮기고
            this.boardService.writeImageToTest(boardDTO.getContent(), fileUtils.getDateFolder());
            //img 태그 내 정보를 수정하여 글 저장
            this.boardService.writeBoard(boardDTO);
        } catch (Exception var3) {
            System.out.println("error: " + var3);
        }

    }

    //게시글 목록 출력. 페이지 번호에 따라 지정 개수 만큼의 게시글을 출력한다.
    // 페이징 처리 방식이 아닌 무한 스크롤의 경우 어떻게 하는 건지 공부 및 수정 필요.
    @PostMapping(path = {"getMentorList"})
    public Page<BoardMentorDTO> getWriteList(@PageableDefault(page = 0,size = 5,sort = {"seq"},direction = Sort.Direction.DESC) Pageable pageable) {
        //페이지 정보를 포함하여 게시글 정보를 받아온다.
        System.out.println("멘토출력 controller: " + pageable);
        Page<BoardMentorDTO> list = this.boardService.getWriteList(pageable);
        return list;
    }

    //이미지 저장
    //@Secured("ROLE_USER")
    @PostMapping(path={"writeImage"})
    public Map<String, Object> writeImageToTemp(@RequestParam("upload") MultipartFile file) throws Exception {
        return boardService.uploadImageToTemp(file);
    }

    //글 삭제. 글 내부 img 태그 내용을 통해 서버에서 이미지를 삭제한 후 글 내용을 삭제함.
    @Secured("ROLE_USER")
    @PostMapping(path={"deleteBoard"})
    public String deleteBoard(@RequestParam("seq") String seq, @RequestParam("member_id")String member_id){
        System.out.println("delete controller: "+seq);
        BigInteger seqInt = new BigInteger(seq);
        return boardService.deleteBoard(seqInt, member_id);
    }

    //게시글 수정을 위한 게시글 1개의 정보와 이미지 목록을 전달.
    @Secured("ROLE_USER")
    @PostMapping(path = {"getUpdateBoard"})
    public Map<String, Object> getUpdateBoard(@RequestParam("seq") String seq, @RequestParam("member_id")String member_id){
        //System.out.println("getBoard(controller):"+seq);
        BigInteger seqInt = new BigInteger(seq);
        return boardService.getUpdateBoard(seqInt, member_id);
    }

    //게시글 수정. 수정된 이미지 정보를 갱신(필요없어진 이미지 삭제, 필요한 이미지 test 업로드)하고 게시글을 갱신함.
    @Secured("ROLE_USER")
    @PostMapping(path = {"updateBoard"})
    public void updateBoard(@RequestBody Map<String, Object> requestData){
        //System.out.println("글 수정할게요 controller");
        System.out.println("Request Data: " + requestData); // 디버깅을 위한 출력

        List<String> imageNamesBefore = (List<String>) requestData.get("imageNamesBefore");
        BoardMentorDTO boardDTO = new ObjectMapper().convertValue(requestData.get("board"), BoardMentorDTO.class);

        boardService.updateBoard(imageNamesBefore, boardDTO);
    }

}

