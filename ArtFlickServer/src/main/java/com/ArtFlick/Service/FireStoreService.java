package com.ArtFlick.Service;

import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class FireStoreService {

    private Firestore db;

    public FireStoreService(Firestore db) {
        System.out.println("Firestore Service initialized");
        this.db = db;
    }

    private void ensureFirestoreClient() {
      if (db == null) {
          db = FirestoreClient.getFirestore();
      }
  }

    public <T> void addDocument(String collection, String documentId, T data) throws Exception {
        try {
            ensureFirestoreClient();
            ApiFuture<WriteResult> future = db.collection(collection).document(documentId).set(data);
            future.get(); // Ensure the write is complete
        } catch (Exception e) {
            throw new Exception("Error adding document: " + e.getMessage(), e);
        }
    }

    public DocumentSnapshot getDocument(String collection, String documentId) throws Exception {
        try {
            ensureFirestoreClient();
            DocumentReference docRef = db.collection(collection).document(documentId);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            return future.get();
        } catch (Exception e) {
            throw new Exception("Error retrieving document: " + e.getMessage(), e);
        }
    }

    public QuerySnapshot getAllDocuments(String collection) throws ExecutionException, InterruptedException {
        try {
            ensureFirestoreClient();
            ApiFuture<QuerySnapshot> future = db.collection(collection).get();
            return future.get();
        } catch (ExecutionException | InterruptedException e) {
            throw new ExecutionException("Error retrieving all documents: " + e.getMessage(), e);
        }
    }

    public <T> void updateDocument(String collection, String documentId, T data) throws Exception {
        try {
            ensureFirestoreClient();
            ApiFuture<WriteResult> future = db.collection(collection).document(documentId).set(data);
            future.get();
        } catch (Exception e) {
            throw new Exception("Error updating document: " + e.getMessage(), e);
        }
    }

    public void deleteDocument(String collection, String documentId) throws ExecutionException, InterruptedException {
        try {
            ensureFirestoreClient();
            ApiFuture<WriteResult> future = db.collection(collection).document(documentId).delete();
            future.get();
        } catch (ExecutionException | InterruptedException e) {
            throw new ExecutionException("Error deleting document: " + e.getMessage(), e);
        }
    }
}
