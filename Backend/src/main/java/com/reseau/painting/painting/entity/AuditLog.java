package com.reseau.painting.painting.entity;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "audit_log")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id_log;

    @Column(name = "action", nullable = false)
    private String action;

    @Column(name = "entity_type")
    private String entityType;

    @Column(name = "entity_id")
    private Long entityId;

    @Column(name = "old_values", columnDefinition = "TEXT")
    private String oldValues;

    @Column(name = "new_values", columnDefinition = "TEXT")
    private String newValues;

    @Column(name = "date_action")
    private Instant dateAction;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user")
    private Utilisateur utilisateur;

    public AuditLog() {}

    // Constructeur, c'est ici que toutes les valeurs seront initialisées, sauf l'id_log qui est auto-généré.
    public AuditLog(String action, String entityType, Long entityId, String oldValues, String newValues, Instant dateAction, Utilisateur utilisateur) {
        this.action = action;
        this.entityType = entityType;
        this.entityId = entityId;
        this.oldValues = oldValues;
        this.newValues = newValues;
        this.dateAction = dateAction;
        this.utilisateur = utilisateur;
    }
    
    public Long getId_log() { return id_log; }
    public String getAction() { return action; }
    public String getEntityType() { return entityType; }
    public Long getEntityId() { return entityId; }
    public String getOldValues() { return oldValues; }
    public String getNewValues() { return newValues; }
    public Instant getDateAction() { return dateAction; }
    public Utilisateur getUtilisateur() { return utilisateur; }
}
