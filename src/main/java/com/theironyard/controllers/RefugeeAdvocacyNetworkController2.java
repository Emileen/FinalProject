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
    public void init() throws FileNotFoundException, InterruptedException {
        if (agencies.count() == 0) {
            File f = new File("agency.csv");
            Scanner fileScanner = new Scanner(f); // scan the file
            while (fileScanner.hasNext()) { // as long as there is a next line
                String line = fileScanner.nextLine();
                String[] columns = line.split(","); // look into the file and separate at the ,
                //create agency object and store the values in the specific columns
                Agency oneAgency = new Agency(columns[0], columns[1], columns[2], columns[3], columns[4], columns[5]);
                //sleep the thread since google api has a max capacity and we are accessing above the max capacity
                Thread.sleep(250);
                //setting the lat and lng
                oneAgency.setLatLongValues();
                //saving the agency in the repository
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
                Thread.sleep(250);
                oneResource.setLatLongValues();
                // find lat/long
                resources.save(oneResource);
            }
        }
    }

    //diaplay a list of agencies
    @CrossOrigin
    @RequestMapping(path = "/agencies", method = RequestMethod.GET)
    public List<Agency> showAgencies() {
        return agencies.findAll();
    }

    // display a list of resources
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

   //based on the button the register picks save the object - agency or resource to the appropriate database
    //look at setting a flag so that when the flag is verified then it can be stored into the database
    @CrossOrigin
    @RequestMapping(path = "/registerAll", method = RequestMethod.POST)
    public String registerAgency(String category, String name, String address, String phone, String contactPerson, String email,String website) { //standard submisson will work the other way
        if (category.equalsIgnoreCase("agency")){
            Agency agency = new Agency(name,address ,phone,contactPerson,email,website);
            agency.setLatLongValues();
            agencies.save(agency);
        }else {
            //have to assign a resource category along with saving the new registration to the database
            Resource resource = new Resource(name,address,phone, contactPerson,address,email,website);
            resource.setLatLongValues();
            resource.setCategory(category);
            resources.save(resource);
        }
        //postData.setLatLongValues();
        //return agencies.save(postData);// give me the request body and turn it into a agency body
        return "redirect:/";
    }

    //depending on what category that is selected by the visitor to the website, find all the information and display it
    // on the google map
    @CrossOrigin
    @RequestMapping(path = "/resource/{category}", method = RequestMethod.GET)
    public List<Resource> showResources(@PathVariable("category") String category) {
        // List<Resource> resourceList = (List)resources.findAll();

        List<Resource> resourceList;
        //depending on the category that is clicked then send the list of the objects
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

    //search the database
    //get the name of the agency/ resource from the front end
    //go into the database and pull out that list of names that correspond to the search criteria
    @CrossOrigin
    @RequestMapping ( path = "/search/{name}",  method = RequestMethod.GET)
    //(/search)
    public Object selection(@PathVariable String name){ // creates and abstract object
        // String name
        //?name=
        List<Object> searchObject = new ArrayList<>();

        List<Agency> agency = agencies.findByNameContainsIgnoreCase(name);
        searchObject.addAll(agency);

        List<Resource> resource = resources.findByNameContainsIgnoreCase(name);
        searchObject.addAll(resource);

        return searchObject;
    }
}

