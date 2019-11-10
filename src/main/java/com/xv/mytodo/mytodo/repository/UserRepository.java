package com.xv.mytodo.mytodo.repository;

import com.xv.mytodo.mytodo.model.AppUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<AppUser, Long> {
    AppUser findByUsername(String username);
}
