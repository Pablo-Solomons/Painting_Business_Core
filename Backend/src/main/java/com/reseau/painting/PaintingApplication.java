package com.reseau.painting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Files;
import java.nio.file.Path;

@SpringBootApplication
public class PaintingApplication {

	public static void main(String[] args) {

		if(System.getProperty("spring.docker.compose.file") == null) {
			Path[] composeFiles = {
				Path.of("compose.yaml"),
				Path.of("Backend","compose.yaml"),
			};
			for (Path composeFile : composeFiles) {
				if (Files.exists(composeFile)) {
					System.setProperty("spring.docker.compose.file", composeFile.toAbsolutePath().toString());
					break;
				}
			}
			if (System.getProperty("spring.docker.compose.file") == null) {
				System.err.println("No docker compose file found. Please create a compose.yaml file in the project root.");
				System.exit(1);
			}
		}

		SpringApplication.run(PaintingApplication.class, args);
	}

}
