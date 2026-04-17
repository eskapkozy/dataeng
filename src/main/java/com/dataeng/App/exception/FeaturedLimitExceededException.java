package com.dataeng.App.exception;

public class FeaturedLimitExceededException extends RuntimeException {
    public FeaturedLimitExceededException(String message) {
        super(message);
    }
}
