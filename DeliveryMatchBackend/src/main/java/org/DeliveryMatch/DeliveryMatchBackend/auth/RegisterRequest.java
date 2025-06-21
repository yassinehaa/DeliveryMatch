package org.DeliveryMatch.DeliveryMatchBackend.auth;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.DeliveryMatch.DeliveryMatchBackend.entities.Role;

@Data
@Builder
//@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;

    public RegisterRequest(String firstName,String lastName, String email, String password, Role role) {
        this.firstName= firstName;
        this.lastName= lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}