package com.tu.hackathon.util;

import com.tu.hackathon.domain.Track;
import lombok.Data;

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
public class TrackVote implements Comparable<TrackVote>{
  private Track track;
  private Set<String> upVotes = new HashSet<>();
  private Set<String> downVotes = new HashSet<>();

  public TrackVote(Track track){
    this.track = track;
  }

  public TrackVote addUp(String id){
    upVotes.add(id);
    downVotes.remove(id);
    return this;
  }

  public TrackVote addDown(String id){
    downVotes.add(id);
    upVotes.remove(id);
    return this;
  }

  @Override
  public int compareTo(TrackVote o) {
    return Integer.compare(o.upVotes.size() - o.downVotes.size(), this.upVotes.size() - this.downVotes.size()) ;
  }
}
