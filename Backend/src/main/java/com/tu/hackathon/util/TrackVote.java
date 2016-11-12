package com.tu.hackathon.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

/**
 * Organization: HM FK07.
 * Project: Apollon_Backend, com.tu.hackathon.util
 * Author(s): Rene Zarwel
 * Date: 12.11.16
 * OS: MacOS 10.11
 * Java-Version: 1.8
 * System: 2,3 GHz Intel Core i7, 16 GB 1600 MHz DDR3
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrackVote implements Comparable<TrackVote>{
  private Set<String> upVotes = new HashSet<>();
  private Set<String> downVotes = new HashSet<>();

  public TrackVote addUp(String id){
    upVotes.add(id);
    return this;
  }

  public TrackVote addDown(String id){
    downVotes.add(id);
    return this;
  }

  @Override
  public int compareTo(TrackVote o) {
    return Integer.compare(this.upVotes.size() - this.downVotes.size(), o.upVotes.size() - o.downVotes.size()) ;
  }
}
