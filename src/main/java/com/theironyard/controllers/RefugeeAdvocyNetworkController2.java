package com.theironyard.controllers;

import com.theironyard.entities.Agency;
import com.theironyard.entities.Resource;
import com.theironyard.services.AgencyRepository;
import com.theironyard.services.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by emileenmarianayagam on 2/8/17.
 */

@RestController
public class RefugeeAdvocyNetworkController2 {

    @Autowired
    AgencyRepository agencies;

    @Autowired
    ResourceRepository resources;

   @PostConstruct
    public void init(){
       List<Agency> agencie = new ArrayList<>();
       agencie.add(new Agency("south asian", "21 povincial ", "908-786-909", "Kelsey", "newman@afd", "asdfs"));

   }

   //diaplay a list of agencies
    @RequestMapping (path = "/", method = RequestMethod.GET)
    public List<Agency> showAgencies (){
        return agencies.findAll();
    }

    // registers new agencies
    @RequestMapping (path =  "/registration", method = RequestMethod.POST)
    public Agency registerAgency (String name, String address, String phoneNumber, String contactPerson, String email, String website){
        Agency agency = new Agency(name,address,phoneNumber, contactPerson, email, website);
        agencies.save(agency);
        return agency;
    }

    @RequestMapping( path = "/resource", method = RequestMethod.GET)
    public String showResources(){



        return "/";
    }





}
