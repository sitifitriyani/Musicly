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
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable) // Menonaktifkan CSRF jika menggunakan cookie
                .cors() // Mengaktifkan CORS
                .and()
                .authorizeHttpRequests((auth) -> {
                    auth.requestMatchers(HttpMethod.GET, "/api/**").permitAll(); // Mengizinkan akses GET untuk API
                    auth.requestMatchers(HttpMethod.POST, "/api/auth/sign-in").permitAll(); // Mengizinkan akses POST untuk sign-in
                    auth.requestMatchers(HttpMethod.POST, "/api/auth/sign-up").permitAll(); // Mengizinkan akses POST untuk sign-in
                    auth.anyRequest().authenticated(); // Semua permintaan lainnya memerlukan otentikasi
                })
                .build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}