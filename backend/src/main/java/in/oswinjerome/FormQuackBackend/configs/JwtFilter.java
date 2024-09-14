package in.oswinjerome.FormQuackBackend.configs;

import in.oswinjerome.FormQuackBackend.exceptions.TokenExpiredException;
import in.oswinjerome.FormQuackBackend.services.JwtService;
import in.oswinjerome.FormQuackBackend.services.MyUserDetailsService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.rmi.RemoteException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private ApplicationContext context;

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, JwtException {

        if(request.getRequestURI().equals("/exception")){
            filterChain.doFilter(request, response);
            return;
        }


        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.length() > 15 && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];

               username = jwtService.extractUserName(token);

        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = context.getBean(MyUserDetailsService.class).loadUserByUsername(username);

            if (jwtService.validateToken(token, userDetails)) {

                UsernamePasswordAuthenticationToken tok = new UsernamePasswordAuthenticationToken(userDetails, null,
                        userDetails.getAuthorities());
                tok.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(tok);
            }

        }

        filterChain.doFilter(request, response);
    }
}
