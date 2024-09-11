package com.ArtFlick.Modal;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
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
public class User {
  
  @DocumentId
  private String id;
  private String name;
  private String email;
  @JsonProperty(access = Access.WRITE_ONLY)
  private String password;
  private String profilePicture;
  private Timestamp createdAt;
  private Timestamp updatedAt;
}
