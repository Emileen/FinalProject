package com.theironyard.controllers;

import com.theironyard.entities.User;
import com.theironyard.services.PasswordStorage;
import com.theironyard.services.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * Created by emileenmarianayagam on 2/16/17.
 */

@RestController
public class RefugeeAdvocyNetworkEventController {

    @Autowired
    UserRepository users;

    //login in user and has the password so that next time it can be verified and they can enter the site
  /*  @CrossOrigin
    @RequestMapping(path  = "/login", method = RequestMethod.POST)
    public String login(HttpSession session, String name, String password, String email) throws Exception {
        User user = users.findFirstByName(name);
        if(user == null){
            user = new User (name, PasswordStorage.createHash(password), email);
            users.save(user);
        }else if (!PasswordStorage.verifyPassword(password,user.getPassword())){
            throw new Exception("Wrong Password");
        }
        session.setAttribute("name", name);

        return "redirect:/create-event";
    }*/

    @CrossOrigin
    @RequestMapping(path  = "/login", method = RequestMethod.POST)
    public String login(HttpSession session, @RequestBody User user ) throws Exception {
        User currentUser = users.findFirstByName(user.getName()); // get current user
        if(currentUser == null){ // if the current user is null then creae a user
            currentUser = new User (user.getName(), PasswordStorage.createHash(user.getPassword()), user.getEmail()); // create user
            users.save(currentUser);
        }else if (!PasswordStorage.verifyPassword(currentUser.getPassword(),user.getPassword())){
            throw new Exception("Wrong Password");
        }
        session.setAttribute("name", currentUser.getName());

        return "redirect:/create-event";
    }

    @CrossOrigin
    @RequestMapping (path ="/create-event", method = RequestMethod.GET)
    public String createEvent(HttpSession session, String description, String data, String startTime, String endTime){
        return "hello";
    }

    //log out the user
    @CrossOrigin
    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }


}
