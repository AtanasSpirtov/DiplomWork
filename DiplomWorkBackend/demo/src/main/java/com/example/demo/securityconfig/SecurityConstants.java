package com.example.demo.securityconfig;

public class SecurityConstants {

    public static final String SECRET = "SECRET";
    public static final long EXPIRATION_TIME = 3600000;
    public static final String TOKEN_PREFIX = "Bearer:";
    public static final String SECURITY_HEADER_NAME = "Authorization";
    public static final String ROLE_HEADER = "Role";
    public static final String SIGN_IN_URL = "/login";
    public static final String SIGN_UP_URL = "/user/create";
}
