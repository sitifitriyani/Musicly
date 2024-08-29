// package org.fitri.musicly;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class MusiclyApplication {

// 	public static void main(String[] args) {
// 		SpringApplication.run(MusiclyApplication.class, args);
// 	}

// }

package org.fitri.musicly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MusiclyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MusiclyApplication.class, args);
    }
}
