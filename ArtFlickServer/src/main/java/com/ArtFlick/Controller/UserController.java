package com.ArtFlick.Controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ArtFlick.Form.UserAccountForm;
import com.ArtFlick.Modal.User;
import com.ArtFlick.Response.AuthResponse;
import com.ArtFlick.Response.MessageResponse;
import com.ArtFlick.Service.ImageService;
import com.ArtFlick.Service.UserService;
import com.ArtFlick.Util.AuthResponseProvider;

import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private ImageService ImageService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private AuthResponseProvider authResponseProvider;

  @GetMapping("/profile")
  public ResponseEntity<User> getUserProfile(
    @RequestHeader("Authorization") String jwt
  ) throws Exception{
    User user = userService.findUserProfileByJwt(jwt);
    return ResponseEntity.ok(user);
  }

  @DeleteMapping("/{userId}")
  public ResponseEntity<MessageResponse> deleteAccount(
    @PathVariable String userId
  ) throws Exception{
    return userService.deleteUserProfile(userId);
  }

  @PutMapping("/edit/{userId}")
  public ResponseEntity<AuthResponse> editUser(@PathVariable String userId, @ModelAttribute UserAccountForm userAccountForm) throws Exception {
      User user = userService.getUserById(userId).get();
      if(userAccountForm.getProfilePicture() != null && !userAccountForm.getProfilePicture().isEmpty()){
        String fileId = UUID.randomUUID().toString();
        String fileUrl = ImageService.uploadImage(userAccountForm.getProfilePicture(), fileId);
        user.setProfilePicture(fileUrl);
      }
      String name = null;
      if(userAccountForm.getName().length() > 0){
        name = userAccountForm.getName();
        user.setName(userAccountForm.getName());
      }
        
      if(userAccountForm.getPassword().length() > 0){
        user.setPassword(userAccountForm.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
      }
      
      boolean result =  userService.editProfile(userId, user,name);
      if(result){
        return authResponseProvider.getAuthResponse(user.getEmail(), userAccountForm.getPassword());
      }
      else {
        throw new Exception("Error while editing profile");
      }
  }



}
