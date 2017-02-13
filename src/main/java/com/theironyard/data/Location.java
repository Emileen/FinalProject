package com.theironyard.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

/**
 * Created by emileenmarianayagam on 2/12/17.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class Location {
    //has a list of category
    public List<Result> results;

    public Location() {
    }

    public Location(List<Result> results) {
        this.results = results;
    }

    public List<Result> getResults() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }

    @Override
    public String toString() {
        return "Location{" +
                "results=" + results +
                '}';
    }
}
