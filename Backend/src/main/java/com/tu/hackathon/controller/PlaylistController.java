package com.tu.hackathon.controller;

import com.tu.hackathon.domain.Track;
import com.tu.hackathon.repositories.TrackRepo;
import com.tu.hackathon.util.PlaylistQueue;
import com.tu.hackathon.util.TrackVote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

  private final List<SseEmitter> emitters = new ArrayList<>();


  @RequestMapping(path = "/search", method = RequestMethod.GET)
  public List<Track> searchPlaylist(@RequestParam("name") String name){

    return trackRepo.findByNameContainingIgnoreCaseOrArtistNameContainingIgnoreCase(name,name);
  }

  @RequestMapping(method = RequestMethod.GET)
  @Cacheable("playlist")
  public Iterable<Track> getPlaylist(){

    return trackRepo.findAll();
  }

  @RequestMapping(path = "/wishlist",method = RequestMethod.GET)
  public Wishlist getWishList(HttpServletRequest request){

    String ipAddress = getClientIP(request);

    Map<String, Wishlist.WishlistEntry> list = new HashMap<>();

    for (Map.Entry<String, TrackVote> entry : player.getTracks().entrySet()) {
      TrackVote trackVote = entry.getValue();
      Wishlist.VoteType voteType = Wishlist.VoteType.NOT;
      if(trackVote.getUpVotes().contains(ipAddress)){
        voteType = Wishlist.VoteType.UP;
      } else if(trackVote.getUpVotes().contains(ipAddress)){
        voteType = Wishlist.VoteType.DOWN;
      }

      Wishlist.WishlistEntry wishlistEntry = new Wishlist.WishlistEntry(
          trackVote.getTrack(),
          trackVote.getUpVotes().size(),
          trackVote.getDownVotes().size(),
          voteType);

      list.put(entry.getKey(), wishlistEntry);
    }

    return Wishlist.builder().currentSong(player.currentTrack()).wishlist(list).build();
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
    String ipAddress = getClientIP(request);

    if(trackId == null)
      throw new IllegalArgumentException("No Track Provided");

    Track track = trackRepo.findOne(trackId);

    if(track != null) {
      player.queueOnPlaylist(ipAddress, track, upVote);

      emitters.forEach((SseEmitter emitter) -> {
        try {
          emitter.send(getWishList(request).getWishlist().get(trackId), MediaType.APPLICATION_JSON);
        } catch (IOException e) {
          emitter.complete();
          emitters.remove(emitter);
        }
      });
    }
  }

  private String getClientIP(HttpServletRequest request) {
    String ipAddress = request.getHeader("X-FORWARDED-FOR");
    if (ipAddress == null) {
      ipAddress = request.getRemoteAddr();
    }
    return ipAddress;
  }


  @RequestMapping(path = "/stream", method = RequestMethod.GET)
  public SseEmitter stream() throws IOException {

    SseEmitter emitter = new SseEmitter();

    emitters.add(emitter);
    emitter.onCompletion(() -> emitters.remove(emitter));

    return emitter;
  }

}
