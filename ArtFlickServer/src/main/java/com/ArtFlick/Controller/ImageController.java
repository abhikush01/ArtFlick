package com.ArtFlick.Controller;

import java.util.List;
import java.util.UUID;

import org.springframework.ai.image.ImageGeneration;
import org.springframework.ai.image.ImageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ArtFlick.Modal.Image;
import com.ArtFlick.Modal.User;
import com.ArtFlick.Response.MessageResponse;
import com.ArtFlick.Service.ImageGenerateService;
import com.ArtFlick.Service.ImageRelatedService;
import com.ArtFlick.Service.ImageService;
import com.ArtFlick.Service.UserService;
import com.ArtFlick.Util.UniqueIdGenerator;
import com.google.cloud.Timestamp;


@RestController
@RequestMapping("/api/image")
public class ImageController {

  @Autowired
  private ImageGenerateService imageGenerateService;

  @Autowired
  private UserService userService;

  @Autowired
  private ImageService ImageService;

  @Autowired
  private ImageRelatedService imageRelatedService;

  @PostMapping("/generate")
  public ResponseEntity<List<ImageGeneration>> generateImages(@RequestBody String prompt){
    ImageResponse response = imageGenerateService.generateImages(prompt);
    return ResponseEntity.ok(response.getResults());
  }

  @PostMapping("/post")
  public ResponseEntity<MessageResponse> uploadImage(
    @RequestParam("file") MultipartFile file,
    @RequestHeader("Authorization") String jwt,
    @RequestParam("prompt") String prompt
    ) throws Exception{
    Image image = new Image();
    User user = userService.findUserProfileByJwt(jwt);
    Timestamp now = Timestamp.now();
    image.setCreatedAt(now);
    image.setCreatedBy(user.getName());
    image.setUserId(user.getId());
    image.setId(UniqueIdGenerator.generateUniqueId());
    image.setPrompt(prompt);
    if(file != null &&  !file.isEmpty()){
        String fileId = UUID.randomUUID().toString();
        String fileUrl = ImageService.uploadImage(file, fileId);
        image.setImageURL(fileUrl);
    }
    boolean result = imageRelatedService.saveImage(image);
    MessageResponse res = new MessageResponse(result ? "Image Uploaded Successfully!" : "Image Upload Error");
    return ResponseEntity.ok(res);
  }

  @DeleteMapping("/delete/{imageId}")
  public ResponseEntity<MessageResponse> deleteImage(
    @RequestHeader("Authorization") String jwt,
    @PathVariable String imageId
  ) throws Exception{
    Image image = imageRelatedService.getImageById(imageId).get();
    MessageResponse res = new MessageResponse();
    User user = userService.findUserProfileByJwt(jwt);
    if(image.getUserId() == user.getId()){
      return imageRelatedService.deleteImage(imageId);
    }
    else{
      res.setMessage("You are not authorized to delete this image");
      return ResponseEntity.ok(res);
    }
    

  }


}
