package com.tu.hackathon.util;

import com.google.common.collect.Lists;
import com.tu.hackathon.audioplayer.FileSystemPlayer;
import com.tu.hackathon.audioplayer.Player;
import com.tu.hackathon.domain.Track;
import com.tu.hackathon.repositories.TrackRepo;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Organization: HM FK07.
 * Project: Apollon_Backend, com.tu.hackathon
 * Author(s): Rene Zarwel
 * Date: 12.11.16
 * OS: MacOS 10.11
 * Java-Version: 1.8
 * System: 2,3 GHz Intel Core i7, 16 GB 1600 MHz DDR3
 */
@Service
public class PlaylistQueue extends Thread {

  @Value("${music.path}")
  String basePath;

  @Autowired
  TrackRepo trackRepo;

  @Getter
  private Map<String,TrackVote> tracks = new HashMap<>();

  private Player player;
  private ThreadLocalRandom random = ThreadLocalRandom.current();

  @PostConstruct
  public void init(){
    player = new FileSystemPlayer(basePath);
  }


  public synchronized void queueOnPlaylist(String id, Track track, boolean upVote) {

    if (tracks.containsKey(track.getId())) {
      if (upVote){
        tracks.get(track.getId()).addUp(id);
      }else {
        tracks.get(track.getId()).addDown(id);
      }

    } else if (upVote) {
      tracks.put(track.getId(), new TrackVote(track).addUp(id));
    }
  }

  private synchronized Track getNextTrack() {

    Track nextTrack = tracks.entrySet()
        .stream()
        .sorted(Map.Entry.comparingByValue(/*Collections.reverseOrder()*/))
        .map(e -> e.getValue().getTrack())
        .findFirst().orElseGet(() -> {
          List<Track> tracks = Lists.newArrayList(trackRepo.findAll());
          return tracks.get(random.nextInt(tracks.size()));
        });

    tracks.remove(nextTrack.getId());
    return nextTrack;
  }

  @Override
  public void run() {
    while (true) {


      player.playTrack(getNextTrack());

    }
  }
}
