package com.theironyard.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by emileenmarianayagam on 2/20/17.
 */
@Controller
public class HomeController {
    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String homePage() {
        return "index";
    }
}
