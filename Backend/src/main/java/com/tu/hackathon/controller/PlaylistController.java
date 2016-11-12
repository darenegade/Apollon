package com.tu.hackathon.controller;

import com.tu.hackathon.domain.Track;
import com.tu.hackathon.repositories.TrackRepo;
import com.tu.hackathon.util.PlaylistQueue;
import com.tu.hackathon.util.TrackVote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

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
  PlaylistQueue player;

  @Autowired
  TrackRepo trackRepo;


  @RequestMapping(method = RequestMethod.GET)
  @Cacheable("playlist")
  public Iterable<Track> getPlaylist(){

    return trackRepo.findAll();
  }

  @RequestMapping(path = "/wishlist",method = RequestMethod.GET)
  public Map<String,TrackVote> getWishList(){
    return player.getTracks();
  }


  @RequestMapping(path = "/voteup",method = RequestMethod.POST)
  public void voteUp(@RequestBody String trackId, HttpServletRequest request){
    vote(trackId, request, true);
  }

  @RequestMapping(path = "/votedown",method = RequestMethod.POST)
  public void voteDown(@RequestBody String trackId, HttpServletRequest request){
    vote(trackId, request, false);
  }

  private void vote(String trackId, HttpServletRequest request, boolean upVote){
    String ipAddress = request.getHeader("X-FORWARDED-FOR");
    if (ipAddress == null) {
      ipAddress = request.getRemoteAddr();
    }


    if(trackId == null)
      throw new IllegalArgumentException("No Track Provided");

    Track track = trackRepo.findOne(trackId);

    if(track != null)
      player.queueOnPlaylist(ipAddress, track, upVote);
  }

}
