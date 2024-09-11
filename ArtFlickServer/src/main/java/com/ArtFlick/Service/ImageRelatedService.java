package com.ArtFlick.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ArtFlick.Modal.Image;
import com.ArtFlick.Response.MessageResponse;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;

@Service
public class ImageRelatedService {

   @Autowired
  private FireStoreService fireStoreService;

  public List<Image> getAllImages() throws Exception{
    QuerySnapshot querySnapshot = fireStoreService.getAllDocuments("images");
    List<Image> images = querySnapshot.getDocuments().stream()
        .map(document -> document.toObject(Image.class))
        .collect(Collectors.toList());
    return images;
  }

  public List<Image> getAllUserImages(String userId) throws Exception{
    QuerySnapshot querySnapshot = fireStoreService.getAllDocuments("images");
    List<Image> images = querySnapshot.getDocuments().stream()
        .map(document -> document.toObject(Image.class))
        .collect(Collectors.toList());
    images = images.stream().filter(image -> image.getUserId().equals(userId)).collect(Collectors.toList());
    return images;
  }

  public boolean saveImage(Image image){
    try{
      
      fireStoreService.addDocument("images", image.getId(), image);
      return true;
    }
    catch(Exception e){
      e.printStackTrace();
      return false;
    }
  }

  public ResponseEntity<MessageResponse> deleteImage(String imageId) throws Exception {
      MessageResponse res = new MessageResponse();  
      try {
            if (fireStoreService.getDocument("images", imageId).exists()) {
                fireStoreService.deleteDocument("images", imageId);
                res.setMessage("Image deleted successfully.");
            } else {
              throw new Exception("Image not found.");
            }
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            res.setMessage("Error occurred while deleting the Image.");
        }
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

  public Optional<Image> getImageById(String imageId) throws Exception {
        DocumentSnapshot document = fireStoreService.getDocument("images", imageId);
        if (document.exists()) {
            Image image = document.toObject(Image.class);
            return Optional.ofNullable(image);
        }
        return Optional.empty();
    }
}
