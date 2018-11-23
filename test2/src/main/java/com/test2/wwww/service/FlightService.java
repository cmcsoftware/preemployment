package com.test2.wwww.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test2.wwww.model.Flight;
import com.test2.wwww.repository.FlightRepository;

@Service
public class FlightService {

	@Autowired
	private FlightRepository repository;

	public List<String> getAllOrigin() {
		return repository.findDistinctOrigin();
	}

	public List<String> getDestinationsFromOrigin(String origin) {
		return repository.findDestionationFromOrigin(origin);
	}
	
	public void addNewFlight(Flight flight) {
		repository.save(flight);
	}
	
	public List<Flight> getFlight(String origin, String destination, Date date){
		return repository.getFlight(origin, destination, date);
	}

}
