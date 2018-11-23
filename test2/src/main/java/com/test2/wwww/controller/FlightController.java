package com.test2.wwww.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test2.wwww.model.Flight;
import com.test2.wwww.service.FlightService;

@RestController
@CrossOrigin(origins = {"http://192.168.209.75:3000","http://localhost:3000" })
@RequestMapping("/flight")
public class FlightController {

	
	@Autowired
	private FlightService flightService;
	
	
	@GetMapping("/getOrigins")
    public List<String> getAllOrigin() {
    	return flightService.getAllOrigin();
    }
	
	@GetMapping("/getDestinations")
    public List<String> getAllDestinationsFromOrigin(@RequestParam String origin) {
    	return flightService.getDestinationsFromOrigin(origin);
    }
	
	@PostMapping("/insert")
    public void insert(@RequestParam String origin, @RequestParam String destination, @RequestParam Date date) {
		System.out.println(origin);
		System.out.println(destination);
		Flight flight = new Flight();
		flight.setDate(date);
		flight.setOrigin(origin);
		flight.setDestination(destination);
		flight.setFreePlaces(100);
		flight.setPrice(25);
    	flightService.addNewFlight(flight);
    }
	
	@GetMapping("/getFlight")
    public String getFlight(@RequestParam String origin, @RequestParam String destination, @RequestParam Date date) {
			List<Flight> list = flightService.getFlight(origin, destination, date);
			if (list.isEmpty()) {
				return "No flight on this date";
			} 
			return "Flight found";
//			String flightString = "";
//			for(Flight flight : list) {
//				flightString+="--" +flight.getDate().getHours() + ":"+flight.getDate().getMinutes();
//			}
//			return flightString;
    }
}
