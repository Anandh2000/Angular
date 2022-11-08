package com.finzly.loanApplicationManagement.jwtAuthentication.resource;
public class AuthenticationException extends RuntimeException {
    public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}

