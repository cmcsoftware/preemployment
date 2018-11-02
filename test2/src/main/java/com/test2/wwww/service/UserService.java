/**
 * 
 */
package com.test2.wwww.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test2.wwww.model.User;
import com.test2.wwww.repository.UserRepository;

/**
 * @author mariusc
 *
 */
@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	
	public List<User> getAllUsers() {
        return userRepository.findAll();
    }
	
	public User getUserByName(String userName) {
		return userRepository.findOne(userName);
	}
	
	public User getAuthenticatedUser(String userName, String password) {		
			return userRepository.findByUsernameAndPassword(userName, password);
	}
}
