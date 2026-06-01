package com.reseau.painting.core.interceptor;
import java.util.Locale;
import java.util.UUID;

import com.reseau.painting.core.context.RequestContext;
import com.reseau.painting.core.tenant.TenantContext;
import com.reseau.painting.core.tenant.TenantResolver;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class HeaderInterceptor implements HandlerInterceptor{

    private final TenantResolver tenantResolver;

    public HeaderInterceptor(TenantResolver tenantResolver) {
        this.tenantResolver = tenantResolver;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
        String actorId= request.getHeader("X-Actor-Id");
        String traceId= request.getHeader("X-Trace-Id");
        String tenantId= request.getHeader("X-Tenant-Id");
        String local=request.getHeader("Accept-Language");
        RequestContext.setActorId(actorId != null && !actorId.isBlank() ? actorId : null);
        RequestContext.setTraceId(traceId != null && !traceId.isBlank() ? traceId : UUID.randomUUID().toString());
        RequestContext.setTenantId(tenantId != null && !tenantId.isBlank() ? tenantId : "painting");
        RequestContext.setLocale(local != null && !local.isBlank() ? local : Locale.getDefault().toLanguageTag());
        try {
            TenantContext.setCurrentTenant(tenantResolver.resolveCurrentTenant());
            return true;
        } catch (IllegalArgumentException ex) {
            RequestContext.clear();
            TenantContext.clear();
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            try {
                response.getWriter().write("{\"error\":\"Invalid tenant\"}");
            } catch (Exception ignored) {
            }
            return false;
        }
    }
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex){
        RequestContext.clear();
        TenantContext.clear();
    }
}
