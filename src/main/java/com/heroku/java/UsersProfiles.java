package com.heroku.java;

import com.heroku.java.logIn.LogInRepository;

import java.util.List;

public class UsersProfiles {
    List<UserProfile> users;
    LogInRepository logInRepository;
    public UserProfile UserProfileFromId(Long userId) {
        int i = 0;
        String usernameI = "";
        String usernameR = "";

        try {
            usernameI = users.get(i).getUsername();
            usernameR = logInRepository.getUsernameById(userId);
        } catch(NullPointerException e) {

        }

        for (i = 0; i < users.size(); i++) {
            if (usernameI == usernameR) {
                break;
            }
        }
        return null;
    }
    public UserProfile getUserProfile(Long Id){
        UserProfile user = UserProfileFromId(Id);
        return user;
    }

    public List<UserProfile> getUsersProfiles() {
        return users;
    }
}

