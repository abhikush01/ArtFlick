package com.ArtFlick.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ArtFlick.Modal.User;

@Service
public class CustomUserDetails implements UserDetailsService {

  @Autowired
  private UserService userService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = null;
    try {
      user = userService.findUserByEmail(username);  
    } catch (Exception e) {
      e.printStackTrace();
    }
    if (user == null) {
      throw new UsernameNotFoundException("User not found: " + username);
    }
    User curr = user;
    List<GrantedAuthority> authorities = new ArrayList<>();
    return new org.springframework.security.core.userdetails.User(curr.getEmail(), curr.getPassword(), authorities);
  }
}
