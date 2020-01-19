package org.zhxie.sprintpoker.entity.dto;

import com.google.common.collect.Maps;

import java.util.Map;

/**
 * Created by jianyang on 2019/1/9.
 */
public class ResponseResult {
    public static final int SUCCESS = 2000;
    public static final int NEED_LOGIN = 3000;
    public static final int LOGIN_ERROR = 4000;
    public static final int REGIST_ERROR = 4001;
    public static final int FAIL = 4002;

    private int statusCode;
    private String message;
    private Map<String, Object> data = Maps.newHashMap();

    public ResponseResult(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    public ResponseResult(int statusCode, String message, Map<String, Object> data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

}
