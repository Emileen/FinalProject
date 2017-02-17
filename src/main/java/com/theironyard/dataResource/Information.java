package com.theironyard.dataResource;

import java.util.List;

/**
 * Created by emileenmarianayagam on 2/17/17.
 */
public class Information {

    public List<Features> features;

    public Information() {
    }

    public Information(List<Features> features) {
        this.features = features;
    }

    public List<Features> getFeatures() {
        return features;
    }

    public void setFeatures(List<Features> features) {
        this.features = features;
    }
}
