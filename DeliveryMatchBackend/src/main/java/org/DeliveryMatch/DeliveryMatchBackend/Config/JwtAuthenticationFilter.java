package org.DeliveryMatch.DeliveryMatchBackend.Config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        String method = request.getMethod();
        System.out.println("JwtFilter: Processing request: " + method + " " + requestURI);
        final String authHeader = request.getHeader("Authorization");

        if (requestURI.startsWith("/api/v1/auth/") || authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("JwtFilter: Bypassing JWT validation for: " + requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        System.out.println("JwtFilter: Extracted token: " + jwt);
        final String userEmail = jwtService.extractUsername(jwt);
        System.out.println("JwtFilter: Extracted email: " + userEmail);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                System.out.println("JwtFilter: Loaded user: " + userDetails.getUsername() + " with authorities: " + userDetails.getAuthorities());
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    String role = jwtService.extractRole(jwt);
                    System.out.println("JwtFilter: Extracted role: " + role);
                    List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));
                    System.out.println("JwtFilter: Authorities set: " + authorities);
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, authorities);
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("JwtFilter: Authentication set for: " + userEmail + " with authorities: " + authToken.getAuthorities());
                } else {
                    System.out.println("JwtFilter: Token invalid for: " + userEmail);
                }
            } catch (Exception e) {
                System.out.println("JwtFilter: Error loading user: " + userEmail + ", error: " + e.getMessage());
            }
        } else {
            System.out.println("JwtFilter: No userEmail or authentication already set for: " + requestURI);
        }
        filterChain.doFilter(request, response);
    }
}