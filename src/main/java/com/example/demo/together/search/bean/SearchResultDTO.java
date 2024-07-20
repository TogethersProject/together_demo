package com.example.demo.together.search.bean;

import lombok.Builder;
import lombok.Data;

@Data
public class SearchResultDTO {
//    private String option;
//    private String query;
    private int seq;
    private String title;
    private String content;
    private String id;
    private String table;

    SearchResultDTO(int seq, String title, String content, String id, String table){
        this.seq=seq;
        this.title=title;
        this.content=content;
        this.id=id;
        this.table=table;
    }
}
