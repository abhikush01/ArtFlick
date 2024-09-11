package com.ArtFlick.Service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ArtFlick.Helper.AppConstansts;
import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;

@Service
public class ImageService {

   @Autowired
  private Cloudinary cloudinary;


  public String uploadImage(MultipartFile profileImage , String fileId) {  
    try {

      byte[] data = new byte[profileImage.getInputStream().available()];
      profileImage.getInputStream().read(data);

      cloudinary.uploader().upload(data, ObjectUtils.asMap(
        "public_id",fileId
      ));
      return this.getUrlFronPublicId(fileId);

    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
    

  }

  public String getUrlFronPublicId(String publicId) {
    return cloudinary.url().transformation(
      new Transformation<>().width(AppConstansts.CONTACT_IMAGE_WIDTH).height(AppConstansts.CONTACT_IMAGE_HEIGHT).crop(AppConstansts.CONTACT_IMAGE_CROP)
    ).generate(publicId);
  }

}
