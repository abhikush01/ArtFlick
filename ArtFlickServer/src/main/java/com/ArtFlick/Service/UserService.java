package com.ArtFlick.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ArtFlick.Authentication.JwtProvider;
import com.ArtFlick.Modal.Image;
import com.ArtFlick.Modal.User;
import com.ArtFlick.Response.MessageResponse;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;

@Service
public class UserService {
  
  @Autowired
  private FireStoreService fireStoreService;

  @Autowired
  private ImageRelatedService imageRelatedService;

  public User findUserProfileByJwt(String jwt) throws Exception {
    jwt = jwt.substring(7);
    String email = JwtProvider.getEmailFromToken(jwt);
    return findUserByEmail(email);
  }

  public boolean signUp(User user) throws Exception {
      try{
        User existingUser = findUserByEmail(user.getEmail());
        if (existingUser != null) {
          throw new Exception("Email Already registred");
        }

        Timestamp now = Timestamp.now();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        fireStoreService.addDocument("users", user.getId(), user);

        return true;
      }    
      catch(Exception e){
        e.printStackTrace();
        return false;
      }
    

    }

  public boolean editProfile(String userId, User updatedUser,String name) throws Exception {
        DocumentSnapshot document = fireStoreService.getDocument("users", userId);
        if (!document.exists()) {
            throw new Exception("User not found.");
        }

        User user = document.toObject(User.class);
        if (user != null) {
            if(name != null){
              List<Image> images = imageRelatedService.getAllUserImages(userId);
              System.out.println("-----------------------------------------"+images.size());
                for(int i = 0 ; i < images.size() ; i++){
                  images.get(i).setCreatedBy(name);
                  imageRelatedService.saveImage(images.get(i));
                }
            }
            user.setName(updatedUser.getName());
            user.setPassword(updatedUser.getPassword());
            user.setProfilePicture(updatedUser.getProfilePicture());
            user.setUpdatedAt(Timestamp.now());

            fireStoreService.addDocument("users", userId, user);

            return true;
        }
        throw new Exception("Error updating profile.");
    }

  public ResponseEntity<MessageResponse> deleteUserProfile(String userId) throws Exception {
      MessageResponse res = new MessageResponse();  
      try {
            if (fireStoreService.getDocument("users", userId).exists()) {
                fireStoreService.deleteDocument("users", userId);
                res.setMessage("User profile deleted successfully.");
            } else {
              throw new Exception("User not found.");
            }
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            res.setMessage("Error occurred while deleting the user profile.");
        }
        return new ResponseEntity<>(res,HttpStatus.OK);
    }


  public User findUserByEmail(String email) throws Exception {
        QuerySnapshot querySnapshot = fireStoreService.getAllDocuments("users");
        List<User> users = querySnapshot.getDocuments().stream()
                .map(document -> document.toObject(User.class))
                .collect(Collectors.toList());
        User user = null;
        for(User curr : users){
          if(curr.getEmail().equals(email)){
            user = curr;
            break;
          }
        }
        return user;
  }

    public Optional<User> getUserById(String userId) throws Exception {
        DocumentSnapshot document = fireStoreService.getDocument("users", userId);
        if (document.exists()) {
            User user = document.toObject(User.class);
            return Optional.ofNullable(user);
        }
        return Optional.empty();
    }
}
