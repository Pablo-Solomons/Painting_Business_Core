package com.reseau.painting.core.context;

public final class RequestContext {
    
    private static final ThreadLocal<String> ACTOR_ID= new ThreadLocal<>();
    private static final ThreadLocal<String> TRACE_ID=new ThreadLocal<>();
    private static final ThreadLocal<String> TENANT_ID=new ThreadLocal<>();
    private static final ThreadLocal<String> LOCALE=new ThreadLocal<>();

    private RequestContext(){

    }
    public static String getActorId(){
        return ACTOR_ID.get();
    }
    public static void setActorId(String actorId){
        ACTOR_ID.set(actorId);
    }
    public static void setTraceId(String traceId) {
        TRACE_ID.set(traceId);
    }

    public static String getTraceId() {
        return TRACE_ID.get();
    }

    public static void setTenantId(String tenantId) {
        TENANT_ID.set(tenantId);
    }

    public static String getTenantId() {
        return TENANT_ID.get();
    }
    public static void setLocale(String locale) {
        LOCALE.set(locale);
    }

    public static String getLocale() {
        return LOCALE.get();
    }
    public static void clear(){
        ACTOR_ID.remove();
        TRACE_ID.remove();
        TENANT_ID.remove();
        LOCALE.remove();
    }

}
