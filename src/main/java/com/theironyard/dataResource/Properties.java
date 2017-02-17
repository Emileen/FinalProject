package com.theironyard.dataResource;

/**
 * Created by emileenmarianayagam on 2/17/17.
 */
public class Properties {
    public String name;
    public String address;
    public String city;
    public String state;
    public String zipcode;
    public String phone;
    public String category;

    public Properties() {
    }

    public Properties(String name, String address, String city, String state, String zipcode, String phone) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.phone = phone;
        this.category = "hospital";
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

    public void setAddress(String address, String city, String state, String zipcode) {
        this.address = address + city + state + zipcode ;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
