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

    @Column (nullable = false)
    String orgStatement;

    public Agency() {
    }

    public Agency(int id, String name, String address, String phonNumber, String email, String orgStatement) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phonNumber = phonNumber;
        this.email = email;
        this.orgStatement = orgStatement;
    }

    public Agency(String name, String address, String phonNumber, String email, String orgStatement) {
        this.name = name;
        this.address = address;
        this.phonNumber = phonNumber;
        this.email = email;
        this.orgStatement = orgStatement;
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

    public String getOrgStatement() {
        return orgStatement;
    }

    public void setOrgStatement(String orgStatement) {
        this.orgStatement = orgStatement;
    }
}
