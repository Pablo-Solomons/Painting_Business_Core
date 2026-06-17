# Painting Business Core Instance — Guide de test

Plateforme de centralisation des savoirs du métier de peintre. Application frontend Next.js 15 avec données mockées (pas de backend requis).

---

## 1. Démarrer le serveur

```bash
cd Frontend
npm install   # uniquement la première fois
npm run dev
```

Le serveur démarre sur **http://localhost:3000**.

---

## 2. Comptes de démonstration

| Rôle | Email | Mot de passe | Page d'accueil après connexion |
|------|-------|-------------|-------------------------------|
| **Peintre** | `marie@artplastique.demo` | `demo` | `/dashboard/peintre` |
| **Super Admin** | `admin@artplastique.demo` | `demo` | `/admin` |

> **Important** : un seul compte à la fois. Pour changer de compte, se déconnecter d'abord (bouton en bas de la sidebar, ou `localStorage.clear()` dans la console du navigateur).

---

## 3. Pages publiques (Visiteur — sans connexion)

Ouvrir un nouvel onglet privé ou se déconnecter, puis visiter :

| # | Page | URL | À vérifier |
|---|------|-----|------------|
| 1 | 🏠 **Accueil** | http://localhost:3000/ | Navbar : `Catégories | Roadmap | Fiches | Techniques | Œuvres` + bouton `👤 Se connecter`. Footer 4 colonnes sans copyright |
| 2 | 📚 **Fiches** | http://localhost:3000/fiches | Chaque carte affiche `Unité de connaissance`, la question `❓ Qu'est-ce que…` en évidence |
| 3 | 📖 **Détail fiche** | http://localhost:3000/fiches/glacis | Question en exergue `Cette fiche répond à la question`, badge `Unité de connaissance · lisible indépendamment` |
| 4 | 🗺 **Roadmaps** | http://localhost:3000/roadmaps | Liste des parcours avec progression, étapes, fiches liées |
| 5 | 📋 **Détail roadmap** | http://localhost:3000/roadmaps/initiation-huile | Timeline verticale avec étapes et fiches référencées |
| 6 | 🔠 **Catégories** | http://localhost:3000/categories | 5 disciplines (Peinture, Dessin, Sculpture, Gravure, Mixed Media) avec descriptions |
| 7 | 🖌️ **Techniques** | http://localhost:3000/techniques | Glacis, Imprimature, Impasto, Sfumato… avec lien vers fiches |
| 8 | 🎨 **Œuvres** | http://localhost:3000/oeuvres | Galerie 9 œuvres mockées (survol pour voir `Voir l'œuvre`) |
| 9 | 🔑 **Connexion** | http://localhost:3000/connexion | Formulaire login/signup. **Toggle mot de passe** : cliquer sur 👁 → le mdp devient visible, icône devient 🙈 |

---

## 4. Dashboard Peintre (connecté en tant que Marie Durand)

Après connexion avec `marie@artplastique.demo` / `demo` → redirigé vers `/dashboard/peintre`.

| # | Page/Panneau | Comment y accéder | À vérifier |
|---|-------------|-------------------|------------|
| 10 | **Vue d'ensemble** | Défaut après connexion | KPIs, activité, score contributeur, hero card. **Sidebar sombre** (fond foncé comme l'admin) |
| 11 | **Notifications** | Clic sur `🔔 Notifications` dans la sidebar | 3 notifications non-lues avec points verts |
| 12 | **Mes fiches** | Clic sur `📄 Mes fiches` | Tableau avec recherche, filtres par statut, tri |
| 13 | **Nouvelle fiche** | Clic sur `✏️ Nouvelle fiche` | Éditeur complet : question, titre, catégorie, contenu. Boutons `Enregistrer le brouillon` et `Soumettre à modération` |
| 14 | **Roadmaps** | Clic sur `🗺 Roadmaps` | Liste des roadmaps du peintre avec progression |
| 15 | **Analytiques** | Clic sur `📊 Analytiques` | Graphique de vues, top fiches |
| 16 | **Mon profil** | Clic sur `👤 Mon profil` | Infos personnelles, disciplines, score contributeur |

---

## 5. Dashboard Super Admin (connecté en tant qu'Admin)

**Avant tout** : se déconnecter du compte peintre, PUIS se connecter avec `admin@artplastique.demo` / `demo` → redirigé vers `/admin`.

| # | Page/Panneau | URL / Accès | À vérifier |
|---|-------------|------------|------------|
| 17 | **Dashboard principal** | http://localhost:3000/admin | KPIs (peintres, validation, fiches, révision). **Peintres récents** avec boutons ✓ Valider / ✕ Rejeter. Accès rapides. Modération fiches et roadmaps |
| 18 | **Validation peintres** | http://localhost:3000/admin/peintres | Tableau 14 peintres, filtres par statut (Tous/En attente/Actifs/Suspendus/Rejetés), recherche, actions par ligne |
| 19 | **Admin Fiches** | http://localhost:3000/admin/fiches | **Nouveau !** Tableau avec checkboxes, actions en lot (✓ Approuver / ✕ Rejeter la sélection), filtres par statut (Publiés/En révision/Brouillons/Rejetés), lien `Voir` vers la fiche publique |
| 20 | **Admin Roadmaps** | http://localhost:3000/admin/roadmaps | **Nouveau !** Même principe, avec nb étapes et fiches liées affichés |
| 21 | **Admin Catégories** | http://localhost:3000/admin/categories | **Nouveau !** Tableau des 4 catégories, bouton `Renommer` → champ inline modifiable, ✓ pour sauvegarder (simulation) |
| 22 | **Alertes** | http://localhost:3000/admin?panel=alertes | 3 signalements mockés : fiche inexacte, compte suspect, roadmap incomplète. Boutons ✓ Traiter / ✕ Ignorer |
| 23 | **Messages** | http://localhost:3000/admin?panel=messages | 3 messages mockés avec indicateur ●/○ lu/non lu |
| 24 | **Configuration** | http://localhost:3000/admin?panel=config | Formulaire paramètres plateforme : nom, description, nb max fiches (mocké) |

---

## 6. Vérifications spécifiques par modification

### 🔹 Modification 1 — Bouton "Commencer" → "Se connecter" 👤
- **Homepage** (`/`) : bouton en haut à droite = `👤 Se connecter`
- **Autres pages** (ex: `/fiches`) : pas de bouton CTA séparé (la navbar PublicShell n'en a plus)

### 🔹 Modification 2 — "Communauté" → "Œuvres"
- **Homepage** : navbar contient `Œuvres` (plus de `Communauté`)
- `/oeuvres` affiche 9 œuvres

### 🔹 Modification 3 — "Thème" supprimé, "Catégorie" + "Technique" ajoutés
- `/themes` retourne une 404
- `/categories` et `/techniques` sont fonctionnelles

### 🔹 Modification 4 — Texte Roadmap visible
- Sur la homepage, dans la section "Roadmaps structurées", le texte `Des parcours ordonnés…` est en couleur sombre lisible

### 🔹 Modification 5 — Fiches = unités de connaissance
- `/fiches` : chaque carte a `Unité de connaissance` + `❓ question`
- `/fiches/glacis` : `Cette fiche répond à la question` en exergue

### 🔹 Modification 6 — Roadmaps, Catégories, Techniques conformes au rapport
- `/categories` : description BCaaS, hiérarchie $(K, \preceq)$
- `/techniques` : fiches associées ou "Fiche à venir"

### 🔹 Modification 7 — Footer et en-tête embellis
- **Homepage** footer : plus de `© 2025` ni `Fait avec passion`
- **PublicShell** footer : 3 colonnes

### 🔹 Modification 8 — Vue admin différenciée
- `/admin/fiches`, `/admin/roadmaps`, `/admin/categories` : vues distinctes avec actions admin

### 🔹 Modification 9 — Dashboard admin amélioré
- `/admin` : peintres avec boutons d'action, panels Alertes/Messages/Config accessibles

### 🔹 Modification 10 — Toggle mot de passe
- `/connexion` : cliquer sur 👁 change le type du champ en `text` et l'icône en 🙈

### 🔹 Modification 11 — Sidebar peintre sombre
- `/dashboard/peintre` : sidebar avec fond foncé identique à celle de `/admin`

### 🔹 Modification 12 — Dashboard peintre amélioré
- Notifications, Mes fiches, Roadmaps, Analytiques, Profil : contenu enrichi

### 🔹 Modification 13 — Cas d'utilisation admin/peintre
- **Admin** : approuver/rejeter fiches et roadmaps, valider comptes peintres
- **Peintre** : créer fiches et roadmaps, soumettre à modération, voir statuts

---

## 7. Résolution des problèmes courants

| Problème | Solution |
|----------|---------|
| Tous les liens renvoient vers `/dashboard/peintre` | Tu es connecté en tant que peintre. Déconnecte-toi puis connecte-toi en admin |
| Page blanche ou erreur 404 | Vérifie que le serveur tourne (`npm run dev` dans `Frontend/`) |
| Les modifications n'apparaissent pas | Rafraîchis la page (Ctrl+Shift+R) ou vide le cache localStorage |
| Erreur de compilation | Vérifie que `npm install` a été exécuté, puis relance `npm run dev` |