package com.together.board.bean;

import org.springframework.stereotype.Component;

@Component
public class BoardPaging {
    private int currentPage;
    private int pageBlock;
    private int pageSize;
    private int totalA;
    private StringBuffer pagingHTML;

    public BoardPaging() {
    }

    public void makePagingHTML() {
        this.pagingHTML = new StringBuffer();
        int totalP = (this.totalA + this.pageSize - 1) / this.pageSize;
        int startPage = (this.currentPage - 1) / this.pageBlock * this.pageBlock + 1;
        int endPage = startPage + this.pageBlock - 1;
        if (endPage > totalP) {
            endPage = totalP;
        }

        if (startPage != 1) {
            this.pagingHTML.append("<span id = 'paging' onclick='userPaging(" + (startPage - 1) + ")'>이전</span>");
        }

        for(int i = startPage; i <= endPage; ++i) {
            if (i == this.currentPage) {
                this.pagingHTML.append("<span id = 'currentPaging' onclick='userPaging(" + i + ")'>" + i + "</span>");
            } else {
                this.pagingHTML.append("<span id = 'paging' onclick='userPaging(" + i + ")'>" + i + "</span>");
            }
        }

        if (endPage < totalP) {
            this.pagingHTML.append("<span id = 'paging' onclick='userPaging(" + (endPage - 1) + ")'>다음</span>");
        }

    }
}
