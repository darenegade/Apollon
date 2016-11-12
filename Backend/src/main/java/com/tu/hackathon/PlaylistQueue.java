package com.tu.hackathon;

import com.tu.hackathon.audioplayer.Player;
import com.tu.hackathon.audioplayer.FileSystemPlayer;
import com.tu.hackathon.domain.Track;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
@Service
public class PlaylistQueue extends Thread {

  List<Track> nextTracks = new ArrayList<>();
  Player player = new FileSystemPlayer();


  public synchronized void queueOnPlaylist(Track track) {
    if (nextTracks.contains(track)) {
      if (nextTracks.indexOf(track) > 0)
        Collections.swap(nextTracks, nextTracks.indexOf(track), nextTracks.indexOf(track) - 1);
    } else {
      nextTracks.add(track);
    }
  }

  private synchronized Track getNextTrack() {
    if (nextTracks.isEmpty())
      return Track.builder()
          .id("3922750")
          .build();

    return nextTracks.remove(0);
  }

  @Override
  public void run() {
    while (true) {

      player.playTrack(getNextTrack());


    }
  }
}
