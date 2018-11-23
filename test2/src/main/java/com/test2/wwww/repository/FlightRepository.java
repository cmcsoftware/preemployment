/**
 * 
 */
package com.test2.wwww.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.test2.wwww.model.Flight;

/**
 * @author mariusc
 *
 */
public interface  FlightRepository extends JpaRepository<Flight, Long> {

	
	@Query("SELECT DISTINCT origin FROM Flight")
	List<String> findDistinctOrigin();
	
	@Query("SELECT DISTINCT f.destination FROM Flight f where f.origin =?1")
	List<String> findDestionationFromOrigin(String origin);
	
	@Query("SELECT f FROM Flight f where f.origin =?1 AND f.destination =?2 AND f.date = ?3")
	List<Flight> getFlight(String origin, String destination, Date date);
}
