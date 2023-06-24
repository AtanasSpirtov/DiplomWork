package com.example.demo.securityconfig;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.model.User;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.example.demo.securityconfig.SecurityConstants.*;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    public static final String USER_INFORMATION_HEADER = "User-Information";
    private final AuthenticationManager authenticationManager;

    protected static Logger logger = LoggerFactory.getLogger("JWT");

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;

        setFilterProcessesUrl(SIGN_IN_URL);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            String userInformationHeader = req.getHeader(USER_INFORMATION_HEADER);

            logger.info("Attempting authentication with user credentials {}", userInformationHeader);

            User credentials = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                    .readValue(userInformationHeader, User.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.getUsername(),
                            credentials.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException {
        Object principal = auth.getPrincipal();
        logger.info("Generating token with Prefix: {} , with Principal: {} , with Secret: {} , for time: {}",
                TOKEN_PREFIX, principal, SECRET, EXPIRATION_TIME);

        StringBuilder token = new StringBuilder(TOKEN_PREFIX).append(JWT.create()
                .withSubject(((UserDetails) principal).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SECRET.getBytes())));

        res.addHeader(SECURITY_HEADER_NAME, token.toString());
        res.getWriter().write(
                new ObjectMapper().writeValueAsString(
                        new LoginResponse(
                                ((UserDetails) principal).getUsername(),
                                ((UserDetails) principal).getAuthorities().stream().map(GrantedAuthority::getAuthority).toList()
                        )
                )
        );
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Authentication failed: " + failed.getMessage());
    }
}
