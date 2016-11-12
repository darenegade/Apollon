package com.tu.hackathon.jukeapi;

import com.tu.hackathon.domain.Track;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Organization: HM FK07.
 * Project: Apollon_Backend, com.tu.hackathon.jukeapi
 * Author(s): Rene Zarwel
 * Date: 12.11.16
 * OS: MacOS 10.11
 * Java-Version: 1.8
 * System: 2,3 GHz Intel Core i7, 16 GB 1600 MHz DDR3
 */
@FeignClient(name = "juke", url = "http://msh-360.catalog.api.247e.com")
public interface JukeApi {

  @RequestMapping(method = RequestMethod.GET, value = "/tracks/{trackId}", consumes = "application/json")
  Resource<Track> getTrack(@PathVariable("trackId") String trackId);
}
