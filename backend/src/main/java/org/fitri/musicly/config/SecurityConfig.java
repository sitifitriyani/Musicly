package org.fitri.musicly.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.crypto.factory.PasswordEncoderFactories;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         return http
//                 .csrf(AbstractHttpConfigurer::disable)
//                 .authorizeHttpRequests((auth) -> {
//                     auth.requestMatchers(HttpMethod.GET,"/api/planets").authenticated();
//                     auth.anyRequest().permitAll();
//                 }).build();
//     }
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, RequestFilter requestFilter) throws Exception {
        return http
                .cors().and()
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Menonaktifkan CSRF jika menggunakan cookie
                .authorizeHttpRequests((auth) -> {
                    auth.requestMatchers(HttpMethod.GET, "/**").permitAll(); // Mengizinkan akses GET untuk API
                    auth.requestMatchers(HttpMethod.POST, "/api/auth/sign-in").permitAll(); // Mengizinkan akses POST
                                                                                            // untuk sign-in
                    auth.requestMatchers(HttpMethod.POST, "/api/auth/sign-up").permitAll(); // Mengizinkan akses POST
                                                                                            // untuk sign-in
                    // auth.requestMatchers(HttpMethod.POST, "/**").permitAll(); // Mengizinkan
                    // akses GET untuk API
                    // auth.requestMatchers(HttpMethod.PUT, "/**").permitAll(); // Mengizinkan akses
                    // GET untuk API
                    // auth.requestMatchers(HttpMethod.DELETE, "/**").permitAll(); // Mengizinkan
                    // akses GET untuk API
                    auth.anyRequest().authenticated(); // Semua permintaan lainnya memerlukan otentikasi

                })
                .addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}