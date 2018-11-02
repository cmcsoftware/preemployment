/**
 * 
 */
package com.test2.wwww.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test2.wwww.model.User;
import com.test2.wwww.repository.UserRepository;
import com.test2.wwww.service.UserService;

/**
 * @author mariusc
 *
 */
@RestController
@CrossOrigin(origins = {"http://192.168.209.75:3000","http://localhost:3000" })
@RequestMapping("/user")
public class UserController {
	
	
	@Autowired
    private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

	@PostMapping("/getUser")
    public User getUser(@RequestParam String userName) {
        return userService.getUserByName(userName);
    }
	
	@PostMapping("/getAuthUser")
    public boolean getAuthenticatedUser(@RequestParam String userName, @RequestParam String password) {
		
        if (userService.getAuthenticatedUser(userName, password)!= null) {
        	System.out.println("l-am gasit");
        	return true;
        } 
        System.out.println("nu  l-am gasit");
        return false;
    }

	
	@PostMapping("/addUser")
    public void addUser(@RequestParam String userName, @RequestParam String password, @RequestParam String name, @RequestParam String surname, @RequestParam String stuff) {
        User user = new User();
        user.setName(name);
        user.setUsername(userName);
        user.setPassword(password);
        user.setSurname(surname);
        user.setStuff(stuff);
        userRepository.save(user);        		
    }
	
}
