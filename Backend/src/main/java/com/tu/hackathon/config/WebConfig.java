package com.tu.hackathon.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Organization: HM FK07.
 * Project: Apollon_Backend, com.tu.hackathon.config
 * Author(s): Rene Zarwel
 * Date: 13.11.16
 * OS: MacOS 10.11
 * Java-Version: 1.8
 * System: 2,3 GHz Intel Core i7, 16 GB 1600 MHz DDR3
 */
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

  @Override
  public void configureAsyncSupport(AsyncSupportConfigurer configurer) {

    configurer.setDefaultTimeout(1000000);
  }
}
