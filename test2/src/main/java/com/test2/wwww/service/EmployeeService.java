package com.test2.wwww.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test2.wwww.model.Employee;
import com.test2.wwww.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
	
}
