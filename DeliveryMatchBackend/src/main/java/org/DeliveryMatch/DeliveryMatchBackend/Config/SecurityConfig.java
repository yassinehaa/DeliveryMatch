package org.DeliveryMatch.DeliveryMatchBackend.Config;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.DeliveryMatch.DeliveryMatchBackend.entities.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity

public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, AuthenticationProvider authenticationProvider) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/api/v1/auth/**").permitAll()
                                .requestMatchers(
                                        "/v3/api-docs/",
                                        "/swagger-ui/",
                                        "/swagger-ui.html"
                                ).permitAll()
                                .requestMatchers("/api/trips/create/{driverId}").hasAnyAuthority(Role.CONDUCTEUR.name())
                                .requestMatchers("/api/v1").hasAnyAuthority(Role.CONDUCTEUR.name(),Role.EXPEDITEUR.name(),Role.ADMIN.name())
//                        .requestMatchers("/api/v1/anonce/{idAnonce}").hasAnyAuthority(Role.ADMINISTRATEUR.name())
                                .requestMatchers("/api/parcels/send/{senderId}").hasAnyAuthority(Role.EXPEDITEUR.name())
                                .requestMatchers("/**").permitAll()

                                .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .cors(Customizer.withDefaults())
                .authenticationProvider(authenticationProvider)//pour cors policier
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}