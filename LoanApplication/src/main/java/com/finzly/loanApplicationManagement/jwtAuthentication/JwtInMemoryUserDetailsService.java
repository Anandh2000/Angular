package com.finzly.loanApplicationManagement.jwtAuthentication;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

  static {
    inMemoryUserList.add(new JwtUserDetails(1L, "in28minutes",
        "$2a$10$6c.BvQavZ4.a7tpvmjg3yuW91R7oKy2jhH.ZvkWoxnOX00.YeH8m6", "ROLE_USER_2"));
    inMemoryUserList.add(new JwtUserDetails(1L, "User@gmail",
            "$2a$10$6c.BvQavZ4.a7tpvmjg3yuW91R7oKy2jhH.ZvkWoxnOX00.YeH8m6", "ROLE_USER_2"));
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
        .filter(user -> user.getUsername().equals(username)).findFirst();

    if (!findFirst.isPresent()) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
    }

    return findFirst.get();
  }

}


