package com.heroku.java;

import com.heroku.java.logIn.LogInRepository;

import java.util.List;

public class UsersProfiles {
    List<UserProfile> users;
    LogInRepository logInRepository;
    public UserProfile UserProfileFromId(Long userId) {
        int i = 0;
        for (i = 0; i < users.size(); i++) {
            if (users.get(i).getUsername() == logInRepository.getUsernameById(userId)) {
                break;
            }
        }
        return users.get(i);
    }
    public UserProfile getUserProfile(Long Id){
        UserProfile user = UserProfileFromId(Id);
        return user;
    }

    public List<UserProfile> getUsersProfiles() {
        return users;
    }
}

