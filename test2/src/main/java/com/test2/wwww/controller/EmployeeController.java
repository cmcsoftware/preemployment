package com.test2.wwww.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test2.wwww.model.Employee;
import com.test2.wwww.repository.EmployeeRepository;
import com.test2.wwww.service.EmployeeService;

@RestController
@CrossOrigin(origins = {"http://192.168.209.75:3000","http://localhost:3000" })
@RequestMapping("/employee")
public class EmployeeController {
	
	 @Autowired
	    private EmployeeService employeeService;
	    
	    @Autowired
	    private EmployeeRepository employeeRepository;

	    @PostMapping("/getall")
	    public List<Employee> getAllProducts() {
	    	List<Employee> list =  employeeService.getAllEmployees();
	    	return list;
	    }
	    

}
