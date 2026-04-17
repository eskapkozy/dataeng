package com.dataeng.App.exception;

public class DuplicateFeaturedOrderException extends RuntimeException {
    public DuplicateFeaturedOrderException(String message) {
        super(message);
    }
}
