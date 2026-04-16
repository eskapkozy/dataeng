package com.dataeng.App.exception;

public class ArticleAlreadyFeaturedException extends RuntimeException {
    public ArticleAlreadyFeaturedException(String message) {
        super(message);
    }
}
