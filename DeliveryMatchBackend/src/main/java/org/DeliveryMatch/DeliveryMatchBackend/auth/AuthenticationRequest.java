package org.DeliveryMatch.DeliveryMatchBackend.auth;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
//@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    private String email;
    String password;

    public AuthenticationRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }}
