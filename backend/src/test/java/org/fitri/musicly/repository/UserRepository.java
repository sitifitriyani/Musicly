package org.fitri.musicly.repository;

import org.fitri.musicly.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
   User findByEmail(String email);
} 
