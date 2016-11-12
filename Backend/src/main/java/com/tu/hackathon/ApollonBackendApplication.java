package com.tu.hackathon;

import com.tu.hackathon.util.PlaylistDBInit;
import com.tu.hackathon.util.PlaylistQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.feign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ApollonBackendApplication implements CommandLineRunner {

	@Autowired
	PlaylistQueue player;

	@Autowired
	PlaylistDBInit dbInit;

	public static void main(String[] args) {
		SpringApplication.run(ApollonBackendApplication.class, args);
	}

	@Override
	public void run(String... strings) throws Exception {

		dbInit.initDB();

		player.start();
	}
}
