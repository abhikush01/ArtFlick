package com.ArtFlick.Config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

@Configuration
public class FirebaseConfig {

  @Bean
  public FirebaseApp firebaseApp() throws Exception {
    if (FirebaseApp.getApps().isEmpty()) {
      System.out.println("Initializing FirebaseApp...");
      ClassPathResource serviceAccount = new ClassPathResource("serviceAccountKey.json");

      FirebaseOptions options = FirebaseOptions.builder()
              .setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream()))
              .setDatabaseUrl("https://artflick-272f0-default-rtdb.asia-southeast1.firebasedatabase.app")
              .build();

      return FirebaseApp.initializeApp(options);
  } else {
      System.out.println("FirebaseApp already initialized.");
      return FirebaseApp.getInstance();
  }

  }

  @Bean
  public Firestore getFirestore() throws Exception{
      FirebaseApp app = firebaseApp();
      return FirestoreClient.getFirestore(app);
  }
  

  
}
