package com.theironyard.controllers;

import com.theironyard.data.Location;
import com.theironyard.entities.Agency;
import com.theironyard.entities.Resource;
import com.theironyard.services.AgencyRepository;
import com.theironyard.services.ResourceRepository;
import jdk.nashorn.internal.ir.debug.JSONWriter;
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



    // registers new agencies
    @CrossOrigin
    @RequestMapping (path =  "/registration", method = RequestMethod.POST)
    public Agency registerAgency (@RequestBody Agency postData){ //standard submisson will work the other way
        return agencies.save(postData);// give me the request body and turn it into a agency body
    }

    //depending on what category that is selected by the visitor to the website, find all the information and display it
    // on the google map
    @CrossOrigin
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

//    @CrossOrigin
//    @RequestMapping ( path = "/resources/{id}", method = RequestMethod.GET)
//    public Location getResourceById(@PathVariable("id") int id) {
    @CrossOrigin
    @RequestMapping ( path = "/resources/", method = RequestMethod.GET)
    public Location getresource() {
        Map<String, String> urlParms = new HashMap<>();
        urlParms.put("accessKey", System.getenv("GOOGLE_API_KEY"));
        Location thislocation = template.getForObject("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway+Mountain+View+CA&key={accessKey}", Location.class, urlParms);
        System.out.println(thislocation.toString());


    return thislocation;
    }

    @CrossOrigin
    @RequestMapping ( path = "/agencies/{id}", method = RequestMethod.GET)
    public Location getAgencyById(@PathVariable("id") int id) {


        Map<String, String> urlParms = new HashMap<>();
        urlParms.put("accessKey", System.getenv("GOOGLE_API_KEY"));

        return template.getForObject("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway+Mountain+View+CA&key={accessKey}", Location.class, urlParms);
    }

    // pass in the address and get from the geolocation latitude and longitude
    //public void location(String address){
}

