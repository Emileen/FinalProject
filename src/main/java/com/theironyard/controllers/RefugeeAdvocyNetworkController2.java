package com.theironyard.controllers;

import com.theironyard.entities.Agency;
import com.theironyard.entities.Resource;
import com.theironyard.services.AgencyRepository;
import com.theironyard.services.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;


// key =AIzaSyB8kcA6y95s-t18etG55CGT4v8CyD5p8kM

//https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY
//https://maps.googleapis.com/maps/api/geocode/json?address=Winnetka&key=AIzaSyB8kcA6y95s-t18etG55CGT4v8CyD5p8kM

/**
 * Created by emileenmarianayagam on 2/8/17.
 */

@RestController
public class RefugeeAdvocyNetworkController2 {

    @Autowired
    AgencyRepository agencies;

    @Autowired
    ResourceRepository resources;

    @Autowired
    RestTemplate template;


   @PostConstruct
    public void init() throws FileNotFoundException {
       if(agencies.count() == 0){
           File f = new File("agency.csv");
           Scanner fileScanner = new Scanner(f);
           while (fileScanner.hasNext()){
               String line = fileScanner.nextLine();
               String [] columns = line.split(",");
               Agency oneAgency = new Agency(columns[0],columns[1],columns[2],columns[3],columns[4],columns[5]);

               // find lat/long

               agencies.save(oneAgency);
           }
       }

       if(resources.count() == 0){
           File f = new File("resource.csv");
           Scanner fileScanner = new Scanner (f);
           while (fileScanner.hasNext()){
               String line = fileScanner.nextLine();
               String [] columns = line.split(",");
               Resource oneResource = new Resource( columns[0], columns[1], columns[2],columns[3]);

               // find lat/long
               resources.save(oneResource);
           }
       }
   }

   //diaplay a list of agencies
   @CrossOrigin
   @RequestMapping (path = "/", method = RequestMethod.GET)
    public List<Agency> showAgencies (){
        return agencies.findAll();
    }


    @CrossOrigin
    @RequestMapping (path = "/resources", method = RequestMethod.GET)
    public List<Resource> showResource (){
        return resources.findAll();

    }


    // registers new agencies
    @CrossOrigin
    @RequestMapping (path =  "/registration", method = RequestMethod.POST)
    public Agency registerAgency (@RequestBody Agency postData){ //standard submisson will work the other way
        postData.setLatLongValues();
        return agencies.save(postData);// give me the request body and turn it into a agency body
    }

    //depending on what category that is selected by the visitor to the website, find all the information and display it
    // on the google map
    @CrossOrigin
    @RequestMapping( path = "/resource/{category}", method = RequestMethod.GET)
    public List<Resource> showResources(@PathVariable("category") String category){
       // List<Resource> resourceList = (List)resources.findAll();

        List<Resource> resourceList;

        if(category.equalsIgnoreCase("health")){
            resourceList = resources.findByCategoryIgnoreCase(category);
        }
        else if (category.equalsIgnoreCase("school")){
            resourceList =resources.findByCategoryIgnoreCase(category);
        }else {
            resourceList = (List)resources.findAll();
        }
        return resourceList;
    }



}

