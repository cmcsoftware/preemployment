package com.test2.wwww.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/")
public class HelloController {
//
//	@Autowired
//	private HelloProxy proxy;
	
	
	@GetMapping("hello")
	public String hello() {
		return "Hello World";
	}
	
	@GetMapping("bunicu")
	public HelloBean testMicroServiceCall() {
//		HelloBean bean = proxy.retrieveExchangeValue("EUR", "INR");
//		return bean;
		return null;
	}	
}
