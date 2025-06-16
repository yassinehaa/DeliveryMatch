package org.DeliveryMatch.DeliveryMatchBackend.Services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.UserDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Repositories.UserRepository;
import org.DeliveryMatch.DeliveryMatchBackend.entities.User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserDTO getUserById(Long id) throws Throwable {
        return (UserDTO) userRepository.findById(id)
                .map(user -> modelMapper.map(user, UserDTO.class))
                .orElseThrow(() -> new RuntimeException("User not found"));
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
}

