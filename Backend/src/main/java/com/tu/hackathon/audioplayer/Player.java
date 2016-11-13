package com.tu.hackathon.audioplayer;

import com.tu.hackathon.domain.Track;

import java.util.Observable;

/**
 * Organization: HM FK07.
 * Project: Apollon_Backend, com.tu.hackathon.audioplayer
 * Author(s): Rene Zarwel
 * Date: 12.11.16
 * OS: MacOS 10.11
 * Java-Version: 1.8
 * System: 2,3 GHz Intel Core i7, 16 GB 1600 MHz DDR3
 */
public abstract class Player extends Observable {
  public abstract void playTrack(Track track);
  public abstract Track currentTrack();
}
