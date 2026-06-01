package com.reseau.painting.core.tenant;

import com.reseau.painting.core.context.RequestContext;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class TenantResolver {

    private static final String DEFAULT_TENANT = "painting";
    private static final Set<String> ALLOWED_TENANTS = Set.of("painting");

    public String resolveCurrentTenant() {
        String raw = RequestContext.getTenantId();

        if (raw == null || raw.isBlank()) {
            return DEFAULT_TENANT;
        }

        String normalized = raw.trim().toLowerCase();

        if (!normalized.matches("^[a-z0-9_-]{2,40}$")) {
            throw new IllegalArgumentException("Invalid tenant format");
        }

        if (!ALLOWED_TENANTS.contains(normalized)) {
            throw new IllegalArgumentException("Unknown tenant: " + normalized);
        }

        return normalized;
    }
}
