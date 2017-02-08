package com.theironyard.controllers;

import com.theironyard.entities.Agency;
import com.theironyard.services.AgencyRepository;
import com.theironyard.services.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
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

   }

   //diaplay a list of agencies
    @RequestMapping (path = "/", method = RequestMethod.GET)
    public List<Agency> showAgencies (){
        return agencies.findAll();
    }

    // registers new agencies
    @RequestMapping (path =  "/registration", method = RequestMethod.POST)
    public Agency registerAgency (String name, String address, String phoneNumber, String email){
        Agency agency = new Agency(name,address,phoneNumber,email);
        agencies.save(agency);
        return agency;
    }




}
