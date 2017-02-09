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
import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

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
    public void init() throws FileNotFoundException {
       if(agencies.count() == 0){
           File f = new File("agency.csv");
           Scanner fileScanner = new Scanner(f);
           while (fileScanner.hasNext()){
               String line = fileScanner.nextLine();
               String [] columns = line.split(",");
               Agency oneAgency = new Agency(columns[0],columns[1],columns[2],columns[3],columns[4],columns[5]);
               agencies.save(oneAgency);
           }
       }

       if(resources.count() == 0){
           File f = new File("resource.csv");
           Scanner fileScanner = new Scanner (f);
           while (fileScanner.hasNext()){
               String line = fileScanner.nextLine();
               String [] columns = line.split(",");
               Resource oneResource = new Resource( columns[0], columns[1], columns[2],columns[3] );
               resources.save(oneResource);
           }

       }

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

    //depending on what category that is selected by the visitor to the website, find all the information and display it
    // on the google map
    @RequestMapping( path = "/resource", method = RequestMethod.GET)
    public String showResources(String category){

        List<Resource> resourceList;

        if(category.equals("Health")){
            resourceList = resources.findByCategory(category);
        }
        if (category.equals("School")){
            resourceList =resources.findByCategory(category);
        }

        return "/";
    }





}
