package com.example.demo.together.search.controller;

import com.example.demo.together.search.bean.SearchResultDTO;
import com.example.demo.together.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RequestMapping(path = {"search"})
@RestController
public class SearchController {
    @Autowired
    private SearchService searchService;

    @PostMapping(path="query")
    public List<SearchResultDTO> query(@RequestBody Map<String, String> map){
        System.out.println("search Controller시작");
        String option = map.get("searchOption");
        String query = map.get("searchQuery");
        System.out.println("option/ query: " + option + " / " + query);
        return searchService.query(option, query);
    }
}
