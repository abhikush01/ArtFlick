package com.ArtFlick.Config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.ArtFlick.Modal.User;
import com.ArtFlick.Response.AuthResponse;
import com.ArtFlick.Service.UserService;
import com.ArtFlick.Util.AuthResponseProvider;
import com.ArtFlick.Util.UniqueIdGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuthenticationSucessHandler implements AuthenticationSuccessHandler{

  @Autowired
  private UserService userService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private AuthResponseProvider authResponseProvider;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication){

  try{
    DefaultOAuth2User user = (DefaultOAuth2User)authentication.getPrincipal();
    ResponseEntity<AuthResponse> res = null;
    User isExist = userService.findUserByEmail(user.getAttribute("email").toString());
    if(isExist == null){
      User newUser = new User();
      newUser.setId(UniqueIdGenerator.generateUniqueId());
      newUser.setEmail(user.getAttribute("email").toString());
      newUser.setName(user.getAttribute("name").toString());
      newUser.setProfilePicture(user.getAttribute("picture").toString().split("=s96-c")[0]);
      newUser.setPassword("Password");
      newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
      boolean result = userService.signUp(newUser);
      if(result){
        res = authResponseProvider.getAuthResponse(newUser.getEmail(), "Password");
      }
      
    }
    else{
      res = authResponseProvider.getAuthResponse(user.getAttribute("email").toString(), "Password");
    }
    
    AuthResponse authResponse = res.getBody();
    if(authResponse != null){
      ObjectMapper objectMapper = new ObjectMapper();
      String jsonResponse = objectMapper.writeValueAsString(authResponse);
  
      response.setContentType("application/json");
      response.setCharacterEncoding("UTF-8");
      response.setStatus(HttpServletResponse.SC_OK);
      response.getWriter().write(jsonResponse);
    }
    else{
      response.addHeader("error", " AuthResponse is null");
    }
    String redirectUrl = "http://localhost:5173?token="+authResponse.getJwt();
    new DefaultRedirectStrategy().sendRedirect(request, response, redirectUrl);
  }
  catch(Exception e){
    e.printStackTrace();
  }

    
  }

}
