package com.example.api.security;

import com.example.api.entity.User;
import com.example.api.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String email = oAuth2User.getAttribute("email");

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            User newUser = new User();
            newUser.setName(oAuth2User.getAttribute("name"));
            newUser.setEmail(oAuth2User.getAttribute("email"));

            if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
                newUser.setImage(oAuth2User.getAttribute("picture"));
            } else if (userRequest.getClientRegistration().getRegistrationId().equals("github")) {
                newUser.setImage(oAuth2User.getAttribute("avatar_url"));
            }

            userRepository.save(newUser);
        } else {
            userOptional.get();
        }

        return oAuth2User;
    }
}