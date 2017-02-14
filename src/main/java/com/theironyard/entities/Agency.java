package com.theironyard.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.theironyard.data.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by emileenmarianayagam on 2/7/17.

  */
@Entity
@Table(name = "agencies")
public class Agency {

    @Id
    @GeneratedValue
    int id;

    @Column
    String name;

    @Column
    String address;

    @Column
    String phoneNumber;

    @Column
    String contactPerson;

    @Column
    String email;

    @Column
    String website;

    @Column
    double latitude;

    @Column
    double longitude;



    public Agency() {
    }

    public Agency(String column, String s, String column1, String s1, String column2) {
    }

    public Agency(int id, String name, String address, String phoneNumber, String contactPerson, String email, String website) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.contactPerson = contactPerson;
        this.email = email;
        this.website = website;
        setLatLongValues();
    }

    public Agency(String name, String address, String phoneNumber, String contactPerson, String email, String website, double latitude, double longitude) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.contactPerson = contactPerson;
        this.email = email;
        this.website = website;
        this.latitude = latitude;
        this.longitude = longitude;
        setLatLongValues();
    }

    public Agency(String name, String address, String phoneNumber, String contactPerson, String email, String website) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.contactPerson = contactPerson;
        this.email = email;
        this.website = website;
        setLatLongValues();
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

    @JsonIgnore
    public void setLatLongValues() {
        Map<String, String> urlParms = new HashMap<>();
        urlParms.put("accessKey", System.getenv("GOOGLE_API_KEY"));
        urlParms.put("address", getAddress());
        Location thislocation = new RestTemplate().getForObject("https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={accessKey}", Location.class, urlParms);

        if (thislocation.getResults().size() >= 1) {
            this.latitude = thislocation.getResults().get(0).getGeometry().getLocation().getLat();
            this.longitude = thislocation.getResults().get(0).getGeometry().getLocation().getLng();
        }
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
