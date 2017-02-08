package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by emileenmarianayagam on 2/7/17.

  */
@Entity
@Table(name = "agencies")
public class Agency {

    @Id
    @GeneratedValue
    int id;

    @Column (nullable = false)
    String name;

    @Column (nullable = false)
    String address;

    @Column
    String phonNumber;

    @Column
    String email;


    public Agency() {
    }

    public Agency(int id, String name, String address, String phonNumber, String email) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phonNumber = phonNumber;
        this.email = email;
    }

    public Agency(String name, String address, String phonNumber, String email) {
        this.name = name;
        this.address = address;
        this.phonNumber = phonNumber;
        this.email = email;
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

    public String getPhonNumber() {
        return phonNumber;
    }

    public void setPhonNumber(String phonNumber) {
        this.phonNumber = phonNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
