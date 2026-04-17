package com.dataeng.App.exception;

public class InvalidArticleStatusException extends RuntimeException {
    public InvalidArticleStatusException(String message) {
        super(message);
    }
}
