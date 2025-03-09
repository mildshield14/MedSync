package com.heroku.java;

import com.heroku.java.logIn.LogInRepository;

import java.util.List;

public class UsersProfiles {
    List<UserProfile> users;
    LogInRepository logInRepository;
    public UserProfile UserProfileFromId(Long userId) {
        int i = 0;
        String usernameI =  users.get(i).getUsername();
        String usernameR = logInRepository.getUsernameById(userId);


        for (i = 0; i < users.size(); i++) {
            usernameI = users.get(i).getUsername();
            usernameR = logInRepository.getUsernameById(userId);
            if (usernameI == usernameR) {
                return users.get(i);
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

