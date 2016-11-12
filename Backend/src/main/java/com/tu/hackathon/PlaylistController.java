package com.tu.hackathon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

/**
 * Organization: HM FK07.
 * Project: Apollon_Backend, com.tu.hackathon
 * Author(s): Rene Zarwel
 * Date: 12.11.16
 * OS: MacOS 10.11
 * Java-Version: 1.8
 * System: 2,3 GHz Intel Core i7, 16 GB 1600 MHz DDR3
 */
@RestController
@RequestMapping("/playlist")
public class PlaylistController {

  @Autowired
  AudioPlayer player;


  @RequestMapping(method = RequestMethod.GET)
  @Cacheable("playlist")
  public List<String> getPlaylist(){

    return Collections.emptyList();
  }

  @RequestMapping(method = RequestMethod.POST)
  public void wishTrack(@RequestBody String track){

    if(track == null)
      throw new IllegalArgumentException("No Track Provided");

    player.queueOnPlaylist(track);

  }

}
