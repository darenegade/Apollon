package com.tum.hackathon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;

@Configuration
@ComponentScan
@EnableAutoConfiguration
@Controller
@EnableZuulProxy
public class ApollonGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApollonGatewayApplication.class, args);
	}
}
