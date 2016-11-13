package com.tu.hackathon.controller;

import com.tu.hackathon.domain.Track;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * Organization: HM FK07.
 * Project: Apollon_Backend, com.tu.hackathon.controller
 * Author(s): Rene Zarwel
 * Date: 13.11.16
 * OS: MacOS 10.11
 * Java-Version: 1.8
 * System: 2,3 GHz Intel Core i7, 16 GB 1600 MHz DDR3
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Wishlist {

  private Track currentSong;
  private Map<String, WishlistEntry> wishlist;

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class WishlistEntry{
    private Track track;
    private int up;
    private int down;
    private VoteType voted;
  }

  public enum VoteType{
    UP,DOWN,NOT
  }

}
