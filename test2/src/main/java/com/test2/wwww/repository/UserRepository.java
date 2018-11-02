/**
 * 
 */
package com.test2.wwww.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test2.wwww.model.User;

/**
 * @author mariusc
 *
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
	
	
	User findByUsernameAndPassword(String username, String password);

}
