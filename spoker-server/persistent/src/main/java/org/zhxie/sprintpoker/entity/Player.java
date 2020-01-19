package org.zhxie.sprintpoker.entity;

import lombok.Data;


@Data
public class Player {

    private String name;

    private boolean isHost;

    public Player(String name) {
        this.name = name;
    }

    public Player() {

    }
}
