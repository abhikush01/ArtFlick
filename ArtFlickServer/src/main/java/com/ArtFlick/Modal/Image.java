package com.ArtFlick.Modal;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.annotation.DocumentId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Image {

  @DocumentId
  private String id;
  private String prompt;
  private String createdBy;
  private String userId;
  private String imageURL;
  private Timestamp createdAt;
  
}
