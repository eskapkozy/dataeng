package com.dataeng.App.exception;

public class FeaturedArticleNotFoundException extends RuntimeException {
    public FeaturedArticleNotFoundException(String message) {
        super(message);
    }
}
