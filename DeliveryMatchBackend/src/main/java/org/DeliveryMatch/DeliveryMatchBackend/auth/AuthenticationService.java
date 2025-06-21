package org.DeliveryMatch.DeliveryMatchBackend.auth;

import org.DeliveryMatch.DeliveryMatchBackend.Config.JwtService;
import org.DeliveryMatch.DeliveryMatchBackend.Repositories.UserRepository;
import org.DeliveryMatch.DeliveryMatchBackend.entities.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static org.DeliveryMatch.DeliveryMatchBackend.entities.Role.*;

@Service
//@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }
    public AuthenticationResponse register(RegisterRequest request) {
        User user=new User();

//        // Decide which subclass to create based on role
//        switch (request.getRole()) {
//            case ADMIN -> user = new ();
//            case CONDUCTEUR -> user = new Conducteur();
//            case EXPEDITEUR -> user = new Expéditeur();
//
//            default -> throw new IllegalArgumentException("Invalid role: " + request.getRole());
//        }

        user.setFirstName(request.getFirstName());// or request.getUsername()
        user.setLastName(request.getFirstName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        repository.save(user); // use appropriate repository for the subclass

        String jwtToken = jwtService.generateToken(user);

        AuthenticationResponse response = new AuthenticationResponse();
        response.setAccessToken(jwtToken);
        return response;
    }
//    public AuthenticationResponse register(RegisterRequest request) {
//
//        var user = Utilisateur.builder()
//                .nom(request.getNom())
//                .email(request.getEmail())
//                .password(passwordEncoder.encode(request.getPassword()))
//                .role(request.getRole())
//                .build();
//        repository.save(user);
//        var jwtToken = jwtService.generateToken(user);
//        return AuthenticationResponse.builder()
//                .accessToken(jwtToken)
//                .build();
//    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);


        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }
}