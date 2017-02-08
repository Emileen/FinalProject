package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by emileenmarianayagam on 2/7/17.
 */
@Entity
@Table (name = "resources")
public class Resource {

    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false, unique = true)
    String name;

    @Column (nullable = false, unique = true)
    String address;

    @Column
    String contactName;

    @Column
    String contactNumber;

    @Column (nullable = false)
    String category;

    public Resource() {
    }

    public Resource(int id, String name, String address, String contactName, String contactNumber, String category) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.contactName = contactName;
        this.contactNumber = contactNumber;
        this.category = category;
    }

    public Resource(String name, String address, String contactName, String contactNumber, String category) {
        this.name = name;
        this.address = address;
        this.contactName = contactName;
        this.contactNumber = contactNumber;
        this.category = category;
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
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
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
}
