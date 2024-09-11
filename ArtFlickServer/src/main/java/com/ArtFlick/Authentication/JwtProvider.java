package com.ArtFlick.Authentication;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {

  static SecretKey keys = Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes());

  public static String generateToken(Authentication authentication){

    String jwt = Jwts.builder().setIssuedAt(new Date())
    .setExpiration(new Date(new Date().getTime()+86400000))
    .claim("email", authentication.getName())
    .signWith(keys)
    .compact();

    return jwt;
  }

  public static String getEmailFromToken(String jwt){
      Claims claims = Jwts.parserBuilder().setSigningKey(keys).build().parseClaimsJws(jwt).getBody();

      String email = String.valueOf(claims.get("email"));
      
      return email;
  } 

}
