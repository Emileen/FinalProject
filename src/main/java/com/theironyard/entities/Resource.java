package com.theironyard.entities;

import com.theironyard.data.Location;
import org.springframework.web.client.RestTemplate;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by emileenmarianayagam on 2/7/17.
 */
@Entity
@Table (name = "resources")
public class Resource {

    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String name;

    @Column (nullable = false)
    String address;

    @Column
    String contactNumber;

    @Column (nullable = false)
    String category;

    @Column
    double latitude;

    @Column
    double longitude;



    public Resource() {
    }

    public Resource(int id, String name, String address, String contactNumber, String category) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.contactNumber = contactNumber;
        this.category = category;
        setLatLongValues();
    }

    public Resource(String name, String address, String contactNumber, String category) {
        this.name = name;
        this.address = address;
        this.contactNumber = contactNumber;
        this.category = category;
        setLatLongValues();
    }

    public Resource(String name, String address, String contactNumber, String category, double latitude, double longitude) {
        this.name = name;
        this.address = address;
        this.contactNumber = contactNumber;
        this.category = category;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
        setLatLongValues();
    }

    private void setLatLongValues() {
        Map<String, String> urlParms = new HashMap<>();
        urlParms.put("accessKey", System.getenv("GOOGLE_API_KEY"));
        urlParms.put("address", getAddress());
        Location thislocation = new RestTemplate().getForObject("https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={accessKey}", Location.class, urlParms);

        if (thislocation.getResults().size() >= 1) { // if the address exists then register
            this.latitude = thislocation.getResults().get(0).getGeometry().getLocation().getLat();
            this.longitude = thislocation.getResults().get(0).getGeometry().getLocation().getLng();
        }
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }
}
