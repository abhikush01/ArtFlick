package com.ArtFlick.Controller;


import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ArtFlick.Form.UserAccountForm;
import com.ArtFlick.Modal.User;
import com.ArtFlick.Request.LoginRequest;
import com.ArtFlick.Response.AuthResponse;
import com.ArtFlick.Service.ImageService;
import com.ArtFlick.Service.UserService;
import com.ArtFlick.Util.AuthResponseProvider;
import com.ArtFlick.Util.UniqueIdGenerator;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private UserService userService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private ImageService ImageService;

  @Autowired
  private AuthResponseProvider authResponseProvider;


  @PostMapping("/signup")
  public ResponseEntity<AuthResponse> CreateUserHandler(@ModelAttribute UserAccountForm userAccountForm) throws Exception {
      User user = new User();
      user.setId(UniqueIdGenerator.generateUniqueId());

      

      if(userAccountForm.getProfilePicture() != null && !userAccountForm.getProfilePicture().isEmpty()){
        String fileId = UUID.randomUUID().toString();
        String fileUrl = ImageService.uploadImage(userAccountForm.getProfilePicture(), fileId);
        user.setProfilePicture(fileUrl);
      }
      
      user.setName(userAccountForm.getName());
      user.setEmail(userAccountForm.getEmail());
      user.setPassword(userAccountForm.getPassword());
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      boolean result = userService.signUp(user);

      if(result){
        return authResponseProvider.getAuthResponse(user.getEmail(), userAccountForm.getPassword());
      }
      else{
        throw new Exception("ERROR while signup");
      }
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest loginRequest) throws Exception {
      String email = loginRequest.getEmail();
      String password = loginRequest.getPassword();
      User user = userService.findUserByEmail(email);
      if(user != null){
        if(passwordEncoder.matches(password, user.getPassword())){
          return authResponseProvider.getAuthResponse(email,password);
        }
        else{
          throw new Exception("Invalid password");
        }
      }
      else{
        throw new Exception("User not found.");
      }
      
  }
  

}
