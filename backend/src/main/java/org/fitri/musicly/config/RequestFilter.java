package org.fitri.musicly.config;

import java.io.IOException;
import java.util.ArrayList;

import org.fitri.musicly.models.User;
import org.fitri.musicly.repository.UserRepository;
import org.fitri.musicly.sevice.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RequestFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository adminRepository;

    @Autowired
    public RequestFilter(JwtService jwtService, UserRepository adminRepository) {
        this.jwtService = jwtService;
        this.adminRepository = adminRepository;
    }

    public void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws IOException, ServletException {
        String auth = request.getHeaders("Authorization").toString();
        // System.out.println("ini adalah auth : "+auth);
        Cookie[] cookies = request.getCookies();
        // System.out.println(cookies);

        if (cookies != null) {
            Long id = null;

            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    String token = cookie.getValue();
                    String subject;
                    try {
                        // System.out.println(token);
                        subject = jwtService.verify(token);
                        id = Long.parseLong(subject);
                    } catch (Exception e) {
                        jwtService.signOut(response);
                    }
                    break;
                }
            }

            if (id != null) {
                User user = adminRepository.findById(id).orElse(null);
                if (user != null) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null,
                            new ArrayList<>());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    jwtService.signOut(response);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}