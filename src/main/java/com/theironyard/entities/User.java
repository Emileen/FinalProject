package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by emileenmarianayagam on 2/15/17.
 */

@Entity
@Table(name ="users")
public class User {

    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false, unique = true)
    public String name;

    @Column(nullable = false, unique = true)
    public String password;

    @Column(nullable = false, unique =true)
    public String email;


    public User() {
    }

    public User(int id, String name, String password, String email) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
    }

    public User(String name, String password, String email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
