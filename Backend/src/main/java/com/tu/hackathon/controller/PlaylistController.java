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

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Observable;
import java.util.Observer;

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
public class PlaylistController implements Observer {

  public static String CURRENT_TRACK = "CurrentTrack";
  public static String WISHLIST = "Wishlist";

  @Autowired
  PlaylistQueue player;

  @Autowired
  TrackRepo trackRepo;

  private final List<SseEmitter> emitters = new ArrayList<>();
  private final List<SseEmitter> lostEmitters = new ArrayList<>();

  @PostConstruct
  public void init() {
    player.getPlayer().addObserver(this);
  }

  @RequestMapping(path = "/search", method = RequestMethod.GET)
  public List<Track> searchPlaylist(@RequestParam("name") String name) {

    return trackRepo.findByNameContainingIgnoreCaseOrArtistNameContainingIgnoreCase(name, name);
  }

  @RequestMapping(method = RequestMethod.GET)
  @Cacheable("playlist")
  public Iterable<Track> getPlaylist() {

    return trackRepo.findAll();
  }

  @RequestMapping(path = "/wishlist", method = RequestMethod.GET)
  public Wishlist getWishList(HttpServletRequest request) {

    String ipAddress = getClientIP(request);

    Map<String, Wishlist.WishlistEntry> list = new HashMap<>();

    player.getTracks().entrySet().stream().sorted((o1, o2) -> {
      TrackVote trackVote1 = o1.getValue();
      TrackVote trackVote2 = o2.getValue();
      int tv1 = trackVote1.getUpVotes().size() - trackVote1.getDownVotes().size();
      int tv2 = trackVote2.getUpVotes().size() - trackVote2.getDownVotes().size();
      return tv1 - tv2;
    }).forEach(entry -> {
      TrackVote trackVote = entry.getValue();
      Wishlist.VoteType voteType = Wishlist.VoteType.NOT;
      if (trackVote.getUpVotes().contains(ipAddress)) {
        voteType = Wishlist.VoteType.UP;
      } else if (trackVote.getDownVotes().contains(ipAddress)) {
        voteType = Wishlist.VoteType.DOWN;
      }

      Wishlist.WishlistEntry wishlistEntry = new Wishlist.WishlistEntry(
          trackVote.getTrack(),
          trackVote.getUpVotes().size(),
          trackVote.getDownVotes().size(),
          voteType);

      list.put(entry.getKey(), wishlistEntry);
    });


    return Wishlist.builder().currentSong(player.currentTrack()).wishlist(list).build();
  }


  @RequestMapping(path = "/voteup", method = RequestMethod.POST)
  public void voteUp(@RequestBody String trackId, HttpServletRequest request) {
    vote(trackId, request, true);
  }

  @RequestMapping(path = "/votedown", method = RequestMethod.POST)
  public void voteDown(@RequestBody String trackId, HttpServletRequest request) {
    vote(trackId, request, false);
  }

  private void vote(String trackId, HttpServletRequest request, boolean upVote) {
    String ipAddress = getClientIP(request);

    if (trackId == null)
      throw new IllegalArgumentException("No Track Provided");

    Track track = trackRepo.findOne(trackId);

    if (track != null) {
      player.queueOnPlaylist(ipAddress, track, upVote);

      sendToEmitters(WISHLIST, getWishList(request).getWishlist().get(trackId));
    }
  }

  public void sendToEmitters(String key, Object o) {

    if (lostEmitters.size() > 500) {
      synchronized (this) {
        lostEmitters.forEach(emitters::remove);
      }
    }

    emitters.stream()
        .filter(emitter -> !lostEmitters.contains(emitter))
        .forEach((SseEmitter emitter) -> {

          new Thread(() -> {
            try {
              emitter.send(SseEmitter.event()
                  .id(key)
                  .data(o, MediaType.APPLICATION_JSON));
            } catch (IOException e) {
              emitter.complete();
              synchronized (lostEmitters) {
                lostEmitters.add(emitter);
              }
            }
          }).start();

        });

  }

  private String getClientIP(HttpServletRequest request) {
    String ipAddress = request.getHeader("X-FORWARDED-FOR");
    if (ipAddress == null) {
      ipAddress = request.getRemoteAddr();
    }
    return ipAddress;
  }


  @RequestMapping(path = "/stream", method = RequestMethod.GET)
  public synchronized SseEmitter stream() throws IOException {

    SseEmitter emitter = new SseEmitter();

    emitters.add(emitter);
    emitter.onCompletion(() -> emitters.remove(emitter));

    emitter.send(SseEmitter.event()
        .id(CURRENT_TRACK)
        .data(player.currentTrack(), MediaType.APPLICATION_JSON));

    return emitter;
  }

  @Override
  public void update(Observable o, Object arg) {

    sendToEmitters(CURRENT_TRACK, player.currentTrack());
  }
}
