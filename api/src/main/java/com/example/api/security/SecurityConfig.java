package com.example.api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                //.requestMatchers("/h2-console/**").permitAll()
                                .requestMatchers("/swagger-ui.html").permitAll()
                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                .requestMatchers("/user-info").authenticated()  // Solo permite esta ruta si el usuario está autenticado
                                .anyRequest().authenticated())
                .oauth2Login(oauth2 ->
                        oauth2
                                //.defaultSuccessUrl("http://localhost:5173?logged=true", true)
                                .defaultSuccessUrl("https://todo-spring-boot.vercel.app?logged=true", true)
                )
                .logout(logout ->
                        logout
                                .logoutUrl("/logout")
                                //.logoutSuccessUrl("http://localhost:5173")
                                .logoutSuccessUrl("https://todo-spring-boot.vercel.app")
                                .invalidateHttpSession(true)
                                .deleteCookies("JSESSIONID"))
                .headers(headers -> headers.frameOptions().disable());

        return http.build();
    }
}
