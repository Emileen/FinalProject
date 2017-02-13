package com.theironyard.data;

import java.util.List;

/**
 * Created by emileenmarianayagam on 2/13/17.
 */
public class Geometry {

    public CurrentLocation location;

    public Geometry() {
    }

    public Geometry(CurrentLocation location) {
        this.location = location;
    }

    public CurrentLocation getLocation() {
        return location;
    }

    public void setLocation(CurrentLocation location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "Geometry{" +
                "location=" + location +
                '}';
    }
}
