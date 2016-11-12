package com.tu.hackathon.audioplayer;

import com.tu.hackathon.domain.Track;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import java.io.File;

/**
 * Organization: HM FK07.
 * Project: Apollon_Backend, com.tu.hackathon.audioplayer
 * Author(s): Rene Zarwel
 * Date: 12.11.16
 * OS: MacOS 10.11
 * Java-Version: 1.8
 * System: 2,3 GHz Intel Core i7, 16 GB 1600 MHz DDR3
 */
public class FileSystemPlayer implements Player{

  String basePath;

  public FileSystemPlayer(String basePath) {
    this.basePath = basePath;
  }

  @Override
  public void playTrack(Track track) {

    try {
      File f = new File(basePath + track.getId()+ ".wav");
      AudioInputStream ain = AudioSystem.getAudioInputStream(f);
      Clip clip = AudioSystem.getClip();
      clip.open(ain);
      clip.start();

      System.out.println("\n\nStarted");
      Thread.sleep(clip.getMicrosecondLength()/1000);

    }catch (Exception e){
      e.printStackTrace();
    }

  }
}
