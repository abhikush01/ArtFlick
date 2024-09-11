package com.ArtFlick.Form;


import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAccountForm {

  private String name;
  private String email;
  private String password;
  private MultipartFile profilePicture;

}
