package com.tu.hackathon.util;

import com.tu.hackathon.domain.Track;
import com.tu.hackathon.jukeapi.JukeApi;
import com.tu.hackathon.repositories.TrackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

/**
 * Organization: HM FK07.
 * Project: Apollon_Backend, com.tu.hackathon.util
 * Author(s): Rene Zarwel
 * Date: 12.11.16
 * OS: MacOS 10.11
 * Java-Version: 1.8
 * System: 2,3 GHz Intel Core i7, 16 GB 1600 MHz DDR3
 */
@Service
public class PlaylistDBInit {

  @Autowired
  TrackRepo trackRepo;

  @Autowired
  JukeApi jukeApi;

  @Value("${music.path}")
  String basePath;

  public void initDB(){

    try(Stream<Path> paths = Files.walk(Paths.get(basePath))) {
      paths.forEach(filePath -> {
        if (Files.isRegularFile(filePath)) {
          String fileName = filePath.getFileName().toString();

          System.out.println(fileName);
          if(fileName.endsWith(".wav")) {
            String trackId = fileName.split("\\.")[0];
            Resource<Track> resource = jukeApi.getTrack(trackId);
            Track track = resource.getContent();
            track.setId(trackId);
            track.setImageUrl(resource.getLink("catalog:image-128x128").getHref());
            trackRepo.save(track);
          }
        }
      });
    } catch (Exception e){
      e.printStackTrace();
    }


  }

}
