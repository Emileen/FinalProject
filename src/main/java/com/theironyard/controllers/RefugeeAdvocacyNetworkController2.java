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


/**
 * Created by emileenmarianayagam on 2/8/17.
 */

@RestController // how you return json
public class RefugeeAdvocacyNetworkController2 {

    @Autowired
    AgencyRepository agencies;

    @Autowired
    ResourceRepository resources;

    @Autowired
    RestTemplate template;


    @PostConstruct
    //loads the agency csv file into the database
    public void init() throws FileNotFoundException {
        if (agencies.count() == 0) {
            File f = new File("agency.csv");
            Scanner fileScanner = new Scanner(f);
            while (fileScanner.hasNext()) {
                String line = fileScanner.nextLine();
                String[] columns = line.split(",");
                Agency oneAgency = new Agency(columns[0], columns[1], columns[2], columns[3], columns[4], columns[5]);
                oneAgency.setLatLongValues();
                agencies.save(oneAgency);
            }
        }
        //loads the resource file into the database
        if (resources.count() == 0) {
            File f = new File("resource.csv");
            Scanner fileScanner = new Scanner(f);
            while (fileScanner.hasNext()) {
                String line = fileScanner.nextLine();
                String[] columns = line.split(",");
                Resource oneResource = new Resource(columns[0], columns[1], columns[2], columns[3],columns [4],columns [5]);
                oneResource.setLatLongValues();
                // find lat/long
                resources.save(oneResource);
            }
        }
    }

    //diaplay a list of agencies
    @CrossOrigin
    @RequestMapping(path = "/", method = RequestMethod.GET)
    public List<Agency> showAgencies() {
        return agencies.findAll();
    }

    // provides a list of resources
    @CrossOrigin
    @RequestMapping(path = "/resources", method = RequestMethod.GET)
    public List<Resource> showResource() {
        return resources.findAll();
    }


    // registers new agencies
    @CrossOrigin
    @RequestMapping(path = "/registration", method = RequestMethod.POST)
    public Agency registerAgency(@RequestBody Agency postData) { //standard submisson will work the other way
        postData.setLatLongValues();
        return agencies.save(postData);// give me the request body and turn it into a agency body
    }

    //depending on what category that is selected by the visitor to the website, find all the information and display it
    // on the google map
    @CrossOrigin
    @RequestMapping(path = "/resource/{category}", method = RequestMethod.GET)
    public List<Resource> showResources(@PathVariable("category") String category) {
        // List<Resource> resourceList = (List)resources.findAll();

        List<Resource> resourceList;

        if (category.equalsIgnoreCase("health")) {
            resourceList = resources.findByCategoryIgnoreCase(category);
        } else if (category.equalsIgnoreCase("LanguageImmersion")) {
            resourceList = resources.findByCategoryIgnoreCase(category);
        } else if (category.equalsIgnoreCase("CommunitiesInSchools")) {
            resourceList = resources.findByCategoryIgnoreCase(category);
        } else if(category.equalsIgnoreCase("library")){
            resourceList = resources.findByCategoryIgnoreCase(category);
        } else {
            resourceList = (List) resources.findAll();
        }
        return resourceList;
    }


    //get the name of the agency/ resource from the front end
    //go into the database and pull out that one agency out and return that to the front end for display
    @CrossOrigin
    @RequestMapping ( path = "/search/{name}",  method = RequestMethod.GET)
    public Object selection(@PathVariable ("name") String name){ // creates and abstract object

        Agency agency = agencies.findByName(name);
        Resource resource = resources.findByName(name);

        if (agency != null){
            return agency;
        }
        if (resource != null){
            return  resource;
        }
        return null;
    }
}

