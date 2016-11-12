package com.tu.hackathon;

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
public class AudioPlayer extends Thread {

  List<String> nextTracks = new ArrayList<>();


  public synchronized void queueOnPlaylist(String track) {
    if (nextTracks.contains(track)) {
      if (nextTracks.indexOf(track) > 0)
        Collections.swap(nextTracks, nextTracks.indexOf(track), nextTracks.indexOf(track) - 1);
    } else {
      nextTracks.add(track);
    }
  }

  private synchronized String getNextTrack() {
    if (nextTracks.isEmpty())
      return "Default Track";

    return nextTracks.remove(0);
  }

  @Override
  public void run() {
    while (true) {

      System.out.println("Test");

      //Mock Playtime
      try {
        sleep(5000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }

    }
  }
}
