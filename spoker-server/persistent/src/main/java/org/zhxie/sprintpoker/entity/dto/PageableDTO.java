package org.zhxie.sprintpoker.entity.dto;

import lombok.Data;

@Data
public class PageableDTO {
    private int curPage;
    private int totalPage;
    private String roomName;
    /**
     * The Feature name
     */
    private String title;
    private String taskTitle;
}
