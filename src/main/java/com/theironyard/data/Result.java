package com.theironyard.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

/**
 * Created by emileenmarianayagam on 2/13/17.
 */


/*address_components: [],
        formatted_address: "Winnetka, IL, USA",
        geometry: {},
        place_id: "ChIJW8Va5TnED4gRY91Ng47qy3Q",
        types: []
        }
        ],*/

@JsonIgnoreProperties(ignoreUnknown = true)
public class Result {

    public Geometry geometry;

    public Result() {
    }

    public Result(Geometry geometry) {
        this.geometry = geometry;
    }

    public Geometry getGeometry() {
        return geometry;
    }

    public void setGeometry(Geometry geometry) {
        this.geometry = geometry;
    }
}
