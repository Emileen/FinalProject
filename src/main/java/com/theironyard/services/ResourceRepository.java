package com.theironyard.services;


import com.theironyard.entities.Resource;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by emileenmarianayagam on 2/7/17.
 */
public interface ResourceRepository extends CrudRepository<Resource, Integer> {
    List<Resource> findByCategory (String category);
}
