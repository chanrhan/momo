package com.phoneManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class PhoneManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(PhoneManagementApplication.class, args);
	}

}
