package com.theironyard.data;

/**
 * Created by emileenmarianayagam on 2/13/17.
 */
public class CurrentLocation {

    double lat;
    double lng;

    public CurrentLocation() {
    }

    public CurrentLocation(double lat, double lng) {
        this.lat = lat;
        this.lng = lng;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    @Override
    public String toString() {
        return "CurrentLocation{" +
                "lat=" + lat +
                ", lng=" + lng +
                '}';
    }
}
