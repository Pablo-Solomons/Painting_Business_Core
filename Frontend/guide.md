
Voici l’inventaire complet du site tel qu’il existe aujourd’hui. Base URL dev : **http://localhost:3000**

---

## Public — pages principales

| Page | Lien |
|------|------|
| Accueil | [http://localhost:3000/](http://localhost:3000/) |
| Fiches (liste) | [http://localhost:3000/fiches](http://localhost:3000/fiches) |
| Roadmaps (liste) | [http://localhost:3000/roadmaps](http://localhost:3000/roadmaps) |
| Thèmes / catégories | [http://localhost:3000/themes](http://localhost:3000/themes) |
| Connexion / inscription | [http://localhost:3000/connexion](http://localhost:3000/connexion) |

---

## Fiches — sous-pages (`/fiches/[slug]`)

| Fiche | Lien |
|-------|------|
| Le glacis | [http://localhost:3000/fiches/glacis](http://localhost:3000/fiches/glacis) |
| Huile de lin | [http://localhost:3000/fiches/huile-de-lin](http://localhost:3000/fiches/huile-de-lin) |
| Gesso acrylique | [http://localhost:3000/fiches/gesso-acrylique](http://localhost:3000/fiches/gesso-acrylique) |
| Blanc titane | [http://localhost:3000/fiches/blanc-titane](http://localhost:3000/fiches/blanc-titane) |
| Imprimature | [http://localhost:3000/fiches/imprimature](http://localhost:3000/fiches/imprimature) |
| Bleu de Prusse | [http://localhost:3000/fiches/bleu-de-prusse](http://localhost:3000/fiches/bleu-de-prusse) |

---

## Roadmaps — sous-pages (`/roadmaps/[slug]`)

| Roadmap | Lien |
|---------|------|
| Initiation à la peinture à l’huile | [http://localhost:3000/roadmaps/initiation-huile](http://localhost:3000/roadmaps/initiation-huile) |
| Fondations de l’acrylique | [http://localhost:3000/roadmaps/fondations-acrylique](http://localhost:3000/roadmaps/fondations-acrylique) |

---

## Espace peintre

| Page | Lien |
|------|------|
| Dashboard peintre | [http://localhost:3000/dashboard/peintre](http://localhost:3000/dashboard/peintre) |

**Sections internes** (même URL, navigation par onglets — pas de routes séparées) :
- Vue d’ensemble
- Notifications
- Mes fiches
- Éditeur de fiche *(Nouvelle fiche)*
- Roadmaps
- Éditeur de roadmap *(depuis une carte roadmap)*
- Analytiques
- Mon profil

---

## Administration

| Page | Lien |
|------|------|
| Admin — vue d’ensemble | [http://localhost:3000/admin](http://localhost:3000/admin) |
| Admin — peintres | [http://localhost:3000/admin/peintres](http://localhost:3000/admin/peintres) |

---

## Contenu sans URL propre

Ces éléments existent sur une page unique, sans sous-route :

| Contenu | Page hôte |
|---------|-----------|
| Variantes thème (Terre, Nocturne, Neo, Brutalisme) | [/themes](http://localhost:3000/themes) |
| Onglet Connexion | [/connexion](http://localhost:3000/connexion) |
| Onglet Inscription | [/connexion](http://localhost:3000/connexion) |

---

## Récapitulatif

- **10 routes Next.js** (`page.tsx`)
- **6 fiches** + **2 roadmaps** en routes dynamiques
- **Total : 18 URLs distinctes** accessibles dans le navigateur

Oui, **c’est tout à fait possible** — et c’est même un cas d’usage classique pour une démo / maquette interactive. Avec Next.js seul (sans backend), tu simules un « vrai » site en combinant **contenu mocké**, **état client**, et éventuellement **persistance locale**.

---

## Ce que tu peux simuler (sans backend)

| Comportement | Possible ? | Comment |
|---|---|---|
| Se connecter en tant que peintre ou admin | Oui | Formulaire → choix du rôle → redirection vers le bon dashboard |
| Voir des pages différentes selon le rôle | Oui | Contexte React / cookie / localStorage + guards sur les routes |
| Publier une fiche ou une roadmap | Oui (visuellement) | Ajout/modif dans un state global ou localStorage |
| Voir ses propres fiches vs celles des autres | Oui | Données mockées avec un `authorId` ou `ownerSlug` |
| Modération admin (approuver, rejeter) | Oui | Changer le `status` en mémoire |
| Stats, notifications, favoris | Oui | Données statiques + mises à jour simulées |
| Déconnexion | Oui | Effacer la session simulée |

Ce que tu **ne peux pas** faire sans backend (ou service externe) :
- Vraie authentification sécurisée (mot de passe, JWT serveur)
- Données partagées entre plusieurs navigateurs / utilisateurs réels
- Emails, upload de fichiers persistants, paiements, etc.

Pour une **simulation de démo**, ce n’est généralement pas un problème.

---

## Architecture recommandée (Next.js only)

```mermaid
flowchart TD
  A[Contenu mocké siteContent.ts] --> B[Store session + données]
  C[Page /connexion] -->|login simulé| B
  B --> D{role?}
  D -->|peintre| E[/dashboard/peintre]
  D -->|admin| F[/admin]
  D -->|visiteur| G[/ pages publiques]
  E --> H[CRUD fiches/roadmaps en mémoire]
  F --> I[Modération simulée]
  H --> J[(localStorage optionnel)]
  I --> J
  J --> K[Pages publiques mises à jour]
```

### 1. Données mockées (source de vérité initiale)

Tu as déjà `siteContent.ts` avec fiches, roadmaps, etc. Tu peux l’enrichir avec :

```typescript
// Conceptuel — pas à implémenter maintenant
users: [
  { id: 'marie', role: 'peintre', name: 'Marie Durand', email: 'marie@...' },
  { id: 'admin', role: 'admin', name: 'Super Admin', email: 'admin@...' },
]

fiches: [
  { slug: 'glacis', authorId: 'marie', status: 'published', ... },
  { slug: '...', authorId: 'noah', status: 'draft', ... },
]
```

Chaque entité porte : **auteur**, **statut** (`draft` | `review` | `published`), **dates**, etc.

### 2. Session simulée (qui est connecté ?)

Sur `/connexion`, au submit :
- email `marie@...` → rôle `peintre` → redirect `/dashboard/peintre`
- email `admin@...` → rôle `admin` → redirect `/admin`
- pas de vérification de mot de passe (ou mot de passe fixe type `demo`)

Stockage possible :
- **`localStorage`** : persiste au refresh (pratique pour une démo)
- **`sessionStorage`** : disparaît à la fermeture de l’onglet
- **Cookie** : utile si tu veux que le middleware Next lise le rôle

```typescript
// Session simulée
{ userId: 'marie', role: 'peintre', name: 'Marie Durand' }
```

### 3. Store global (React Context ou Zustand)

Un seul store qui contient :
- `session` (utilisateur connecté ou null)
- `fiches[]`, `roadmaps[]` (copie mutable des mocks)
- actions : `login`, `logout`, `publishFiche`, `createRoadmap`, `approveFiche`…

Les pages lisent ce store au lieu de données figées.

### 4. Guards de routes (accès par rôle)

Deux approches Next.js :

**A. Côté client (simple, suffisant pour une démo)**  
Dans `DashboardPeintrePage` / `AdminPage` :
- si pas connecté → redirect `/connexion`
- si mauvais rôle → redirect ou message 403

**B. Middleware Next.js (`middleware.ts`)**  
Lit un cookie `role=peintre|admin` et bloque `/dashboard/*` ou `/admin/*` avant le rendu.

Pour une simulation, **A + localStorage** suffit largement.

### 5. Simuler « publier une fiche »

Flux typique :

1. Peintre remplit l’éditeur (déjà présent dans le dashboard)
2. Clic « Publier » → `publishFiche({ ...form, authorId: session.userId, status: 'published' })`
3. La fiche est ajoutée/mise à jour dans le store
4. Optionnel : sauvegarde dans `localStorage`
5. La fiche apparaît :
   - dans « Mes fiches » du peintre
   - sur `/fiches` (si `status === 'published'`)
   - en attente dans `/admin` (si `status === 'review'`)

Même logique pour les roadmaps.

### 6. Simuler le super admin

Page `/admin` :
- Liste toutes les fiches avec statut
- Boutons « Approuver » / « Rejeter » → changent le statut dans le store
- Filtre par peintre, par statut
- Stats calculées à la volée : `fiches.filter(f => f.status === 'published').length`

### 7. Simuler « les pages attribuées au peintre »

Deux niveaux :

**Pages statiques par rôle** (ce que tu as déjà) :
- Peintre → `/dashboard/peintre`
- Admin → `/admin`, `/admin/peintres`

**Contenu filtré par utilisateur** :
```typescript
const myFiches = fiches.filter(f => f.authorId === session.userId)
const myRoadmaps = roadmaps.filter(r => r.authorId === session.userId)
```

Le peintre ne voit que **son** contenu ; l’admin voit **tout**.

### 8. Persistance (optionnelle mais utile)

Sans backend, **`localStorage`** est le meilleur compromis :

```
localStorage.setItem('demo-session', JSON.stringify(session))
localStorage.setItem('demo-data', JSON.stringify({ fiches, roadmaps }))
```

Au chargement de l’app : hydrater le store depuis localStorage, sinon utiliser les mocks initiaux.

Bouton « Réinitialiser la démo » → efface localStorage et recharge les mocks.

---

## Ce que ton site a déjà vs ce qu’il manque

| Déjà en place | Manque pour une vraie simulation |
|---|---|
| Pages publiques fiches/roadmaps | Session / auth simulée |
| Dashboard peintre (UI éditeur) | Store mutable + actions publish |
| Admin + admin/peintres | Lien admin ↔ statuts des fiches |
| Données mockées (`siteContent.ts`) | `authorId`, `status`, `users` mock |
| Page connexion (UI) | Logique login + redirect par rôle |

Aujourd’hui, les dashboards sont surtout **des maquettes** : cliquer « Publier » ne change rien dans les données partagées.

---

## Niveaux de simulation (du plus simple au plus réaliste)

### Niveau 1 — Démo légère (1–2 jours)
- Login avec 2 comptes fixes (peintre / admin)
- Redirect par rôle
- Pas de persistance : tout repart à zéro au refresh

### Niveau 2 — Démo convaincante (recommandé)
- Context + localStorage
- CRUD fiches/roadmaps simulé
- Filtrage par auteur et statut
- Admin modère le contenu
- Pages publiques lisent le store (fiches publiées visibles)

### Niveau 3 — Démo avancée
- Middleware Next pour les routes protégées
- `generateStaticParams` + revalidation client pour les slugs dynamiques
- Notifications simulées, historique d’activité, multi-peintres
- Seed data réaliste (3–4 peintres, 20 fiches, 5 roadmaps)

---

## Limites à accepter (et comment les présenter)

En démo, tu peux être transparent :
- « Comptes de démonstration : marie@demo / admin@demo »
- « Les données sont stockées localement dans votre navigateur »
- « Un refresh avec reset efface les modifications »

Personne ne s’attend à une vraie prod dans ce contexte.

---

## Réponse directe à ta question

**Oui, c’est possible**, et ton stack actuel (Next.js App Router + pages déjà découpées + `siteContent.ts`) est **bien parti** pour le faire.

Tu n’as pas besoin de :
- base de données
- API routes (tu peux, mais ce n’est pas obligatoire)
- service d’auth externe

Tu as besoin de :
1. **Utilisateurs mockés** avec rôles
2. **Un store client** (Context / Zustand) pour session + données mutables
3. **Guards** sur dashboard/admin
4. **Actions simulées** (publish, approve, etc.) qui modifient le store
5. **localStorage** si tu veux que ça survive au refresh

---

Quand tu voudras passer à l’implémentation, un ordre logique serait :
1. Store + session simulée
2. Login fonctionnel sur `/connexion`
3. Guards peintre / admin
4. Publish fiche depuis l’éditeur
5. Admin modération
6. Sync avec les pages publiques `/fiches` et `/roadmaps`

Dis-moi si tu veux qu’on parte sur le **niveau 1 ou 2** quand tu seras prêt à modifier le code.