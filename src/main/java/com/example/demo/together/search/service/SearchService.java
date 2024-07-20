package com.example.demo.together.search.service;

import com.example.demo.together.search.bean.SearchResultDTO;

import java.util.List;

public interface SearchService {
    List<SearchResultDTO> query(String option, String query);
}
