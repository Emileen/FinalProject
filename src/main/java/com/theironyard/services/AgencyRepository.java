package com.theironyard.services;

import com.theironyard.entities.Agency;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by emileenmarianayagam on 2/7/17.
 */
public interface AgencyRepository extends CrudRepository<Agency, Integer> {
   List<Agency> findByName(String name);
   List<Agency> findAll();

}
