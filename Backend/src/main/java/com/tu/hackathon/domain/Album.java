package com.tu.hackathon.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Organization: HM FK07.
 * Project: Apollon_Backend, com.tu.hackathon.domain
 * Author(s): Rene Zarwel
 * Date: 12.11.16
 * OS: MacOS 10.11
 * Java-Version: 1.8
 * System: 2,3 GHz Intel Core i7, 16 GB 1600 MHz DDR3
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Album {

  @Id
  String id;

  String name, artists;
}
