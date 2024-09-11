package com.ArtFlick.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ArtFlick.Modal.Image;
import com.ArtFlick.Modal.User;
import com.ArtFlick.Service.ImageRelatedService;
import com.ArtFlick.Service.UserService;

@RestController
@RequestMapping("/public")
public class PublicController {

  @Autowired
  private ImageRelatedService imageRelatedService;

  @Autowired
  private UserService userService;

  @GetMapping("/feed")
  public ResponseEntity<List<Image>> getAllImages() throws Exception{
    return ResponseEntity.ok(imageRelatedService.getAllImages());
  }

  @GetMapping("/feed/{userId}")
  public ResponseEntity<List<Image>> getAllImages(@PathVariable String userId) throws Exception{
    return ResponseEntity.ok(imageRelatedService.getAllUserImages(userId));
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<User> getUserDetails(
    @PathVariable String userId
  ) throws Exception{
    return ResponseEntity.ok(userService.getUserById(userId).get());
  }

}
