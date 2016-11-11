package com.tum.hackathon;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

/**
 * Provides a simple Configuration to enable CORS in this Application.
 *
 * This is needed to access the Server from a Browser with a different Origin.
 *
 * @author Fabian Holtkötter
 **/
@Configuration
public class CORSConfig {

  /**
   * Create a new CORS Filter that can handle the Preflight-Request and sends the required Access-Allow-Origin header
   * if a request with the Origin header was sent.
   *
   * @return the configured CORS-Filter for the Filter-Chain.
   */
  @Bean
  public CorsFilter corsFilter() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.addAllowedOrigin("*");
    config.addAllowedHeader("*");
    config.setAllowedMethods(Arrays.asList("GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
  }
}