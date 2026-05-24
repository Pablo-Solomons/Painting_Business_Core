package com.reseau.painting.core.security;

import com.reseau.painting.core.context.RequestContext;
import com.reseau.painting.core.tenant.TenantContext;
import com.reseau.painting.core.tenant.TenantResolver;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.stream.Collectors;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final TenantResolver tenantResolver;

    public JwtAuthFilter(JwtService jwtService, TenantResolver tenantResolver) {
        this.jwtService = jwtService;
        this.tenantResolver = tenantResolver;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/auth/") || path.startsWith("/actuator/") || "OPTIONS".equalsIgnoreCase(request.getMethod());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7).trim();
        try {
            JwtService.TokenData tokenData = jwtService.parseAndValidate(token);

            String currentTenant = TenantContext.getCurrentTenant();
            if (currentTenant == null || currentTenant.isBlank()) {
                currentTenant = tenantResolver.resolveCurrentTenant();
                TenantContext.setCurrentTenant(currentTenant);
            }

            if (tokenData.tenant() != null && !tokenData.tenant().isBlank() && !currentTenant.equals(tokenData.tenant())) {
                sendError(response, HttpServletResponse.SC_FORBIDDEN, "Tenant mismatch");
                return;
            }

            Collection<SimpleGrantedAuthority> authorities = tokenData.roles().stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(tokenData.subject(), null, authorities);

            SecurityContextHolder.getContext().setAuthentication(auth);

            if (RequestContext.getActorId() == null) {
                RequestContext.setActorId(tokenData.subject());
            }

            filterChain.doFilter(request, response);
        } catch (IllegalArgumentException ex) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, "Invalid tenant");
        } catch (JwtService.TokenValidationException ex) {
            sendError(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
        } finally {
            SecurityContextHolder.clearContext();
            TenantContext.clear();
        }
    }

    private void sendError(HttpServletResponse resp, int status, String message) throws IOException {
        resp.setStatus(status);
        resp.setContentType(MediaType.APPLICATION_JSON_VALUE);
        resp.getWriter().write("{\"error\":\"" + message + "\"}");
    }
}