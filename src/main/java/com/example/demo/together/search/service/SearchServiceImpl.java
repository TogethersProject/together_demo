package com.example.demo.together.search.service;

import com.example.demo.together.boardMentor.DAO.BoardMentorDAO;
import com.example.demo.together.boardVolunteer.DAO.BoardVolunteerDAO;
import com.example.demo.together.search.bean.SearchResultDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchServiceImpl implements SearchService{
    @Autowired
    private BoardVolunteerDAO boardVolunteerDAO;
    @Autowired
    private BoardMentorDAO boardMentorDAO;

    @Override
    public List<SearchResultDTO> query(String option, String query) {
        List<SearchResultDTO> mentorResults = null;
        List<SearchResultDTO> volunteerResults = null;
        List<SearchResultDTO> searchResultDTOs = new ArrayList<>();
        switch (option) {
            case "author" -> {
                //내용 삽입
                mentorResults = boardMentorDAO.findByMemberId(query);
                System.out.println("m: " + mentorResults);
                volunteerResults = boardVolunteerDAO.findByMemberId(query);
                System.out.println("v: " + volunteerResults);
                //정렬
            }
            case "content" -> {
                mentorResults = boardMentorDAO.findByContent(query);
                System.out.println("m: " + mentorResults);
                volunteerResults = boardVolunteerDAO.findByContent(query);
                System.out.println("v: " + volunteerResults);
            }
            case "title" -> {
                mentorResults = boardMentorDAO.findByTitle(query);
                System.out.println("m: " + mentorResults);
                volunteerResults = boardVolunteerDAO.findByTitle(query);
                System.out.println("v: " + volunteerResults);
            }
            default -> {
                System.out.println("잘못된 접근입니다.");
                return null;
            }
        }

        searchResultDTOs.addAll(mentorResults);
        searchResultDTOs.addAll(volunteerResults);
        System.out.println("searchResultDTOS: " + searchResultDTOs);
        return searchResultDTOs;
    }
}
