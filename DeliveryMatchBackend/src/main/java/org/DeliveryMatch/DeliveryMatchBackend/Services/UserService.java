package org.DeliveryMatch.DeliveryMatchBackend.Services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.UserDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Repositories.UserRepository;
import org.DeliveryMatch.DeliveryMatchBackend.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserDTO getUserById(Long id) throws Throwable {
        return userRepository.findById(id)
                .map(user -> modelMapper.map(user, UserDTO.class))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    public List<UserDTO> getallusers(UserDTO userDTO){
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user,UserDTO.class))
                .collect(Collectors.toList());
    }
    public UserDTO updateUser(Long id, UserDTO dto) throws Throwable {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        return modelMapper.map(userRepository.save(user), UserDTO.class);
    }

    public void deactivateUser(Long id) throws Throwable {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActive(false);
        userRepository.save(user);
    }


    public UserDTO createUser(UserDTO dto) {
        User user = modelMapper.map(dto, User.class);
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    public Long getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getId)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}

