package com.theironyard.services;

import com.theironyard.entities.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by emileenmarianayagam on 2/15/17.
 */
public interface UserRepository extends CrudRepository<User ,Integer> {
    User findFirstByName (String name);
}
