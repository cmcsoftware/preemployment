/**
 * 
 */
package com.test2.wwww.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.test2.wwww.model.Employee;

/**
 * @author mariusc
 *
 */
public interface EmployeeRepository  extends JpaRepository<Employee, Long>{

}
