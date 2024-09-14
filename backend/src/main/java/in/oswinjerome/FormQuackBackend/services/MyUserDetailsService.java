package in.oswinjerome.FormQuackBackend.services;

import in.oswinjerome.FormQuackBackend.models.User;
import in.oswinjerome.FormQuackBackend.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return user;
    }
}
