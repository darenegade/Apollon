package com.tu.hackathon.repositories;

import com.tu.hackathon.domain.Track;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Organization: HM FK07.
 * Project: Apollon_Backend, com.tu.hackathon.repositories
 * Author(s): Rene Zarwel
 * Date: 12.11.16
 * OS: MacOS 10.11
 * Java-Version: 1.8
 * System: 2,3 GHz Intel Core i7, 16 GB 1600 MHz DDR3
 */
@RepositoryRestResource(exported = false)
public interface TrackRepo extends CrudRepository<Track, String> {

  Track findByName(String name);
}
