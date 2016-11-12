package com.tu.hackathon.util;

import com.google.common.collect.Lists;
import com.tu.hackathon.audioplayer.FileSystemPlayer;
import com.tu.hackathon.audioplayer.Player;
import com.tu.hackathon.domain.Track;
import com.tu.hackathon.repositories.TrackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
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

  List<Track> nextTracks = new ArrayList<>();
  Player player;
  ThreadLocalRandom random = ThreadLocalRandom.current();

  @PostConstruct
  public void init(){
    player = new FileSystemPlayer(basePath);
  }


  public synchronized void queueOnPlaylist(Track track) {
    if (nextTracks.contains(track)) {
      if (nextTracks.indexOf(track) > 0)
        Collections.swap(nextTracks, nextTracks.indexOf(track), nextTracks.indexOf(track) - 1);
    } else {
      nextTracks.add(track);
    }
  }

  private synchronized Track getNextTrack() {
    if (nextTracks.isEmpty()){
      List<Track> tracks = Lists.newArrayList(trackRepo.findAll());
      return tracks.get(random.nextInt(tracks.size()));
    }

    return nextTracks.remove(0);
  }

  @Override
  public void run() {
    while (true) {

      player.playTrack(getNextTrack());


    }
  }
}
