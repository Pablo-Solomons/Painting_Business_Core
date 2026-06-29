# Cours ArtPlastique — Apprendre React & Next.js à travers un vrai projet

> **Public visé :** débutant en React et Next.js, curieux de comprendre comment une application web moderne est construite.
> **Projet étudié :** le frontend **ArtPlastique** (`artplastique`) — plateforme de fiches techniques, roadmaps pédagogiques et espaces peintres.
> **Statut du cours :** document complet (version 2 — juin 2026).

---

## Table des matières

1. [Introduction](#1-introduction)
2. [Prérequis et environnement](#2-prérequis-et-environnement)
3. [Vue d&#39;ensemble du projet](#3-vue-densemble-du-projet)
4. [Les fondamentaux de React (rappel guidé)](#4-les-fondamentaux-de-react-rappel-guidé)
5. [Next.js et le App Router](#5-nextjs-et-le-app-router)
6. [Architecture des dossiers](#6-architecture-des-dossiers)
7. [Le routage : pages publiques et routes dynamiques](#7-le-routage-pages-publiques-et-routes-dynamiques)
8. [Composants Client vs Server](#8-composants-client-vs-server)
9. [Les layouts et shells (coquilles d&#39;interface)](#9-les-layouts-et-shells-coquilles-dinterface)
10. [Gestion d&#39;état avec React Context](#10-gestion-détat-avec-react-context)
11. [Persistance locale (mode démo)](#11-persistance-locale-mode-démo)
12. [Authentification et rôles](#12-authentification-et-rôles)
13. [Le modèle de données : fiches et roadmaps](#13-le-modèle-de-données-fiches-et-roadmaps)
14. [Workflow éditorial (brouillon → publication)](#14-workflow-éditorial-brouillon--publication)
15. [TypeScript dans le projet](#15-typescript-dans-le-projet)
16. [Le canvas de peinture (PaintCanvas)](#16-le-canvas-de-peinture-paintcanvas)
17. [Styles et CSS global](#17-styles-et-css-global)
18. [Exercices pratiques](#18-exercices-pratiques)
19. [Annexes](#19-annexes)

---

## 1. Introduction

### 1.1 Qu'est-ce qu'ArtPlastique ?

**ArtPlastique** est une application web dédiée à la peinture et aux arts plastiques. Elle permet de :

- **Consulter** des *fiches techniques* (pigments, outils, techniques comme le glacis, le lavis…)
- **Suivre** des *roadmaps* — parcours d'apprentissage structurés en plusieurs étapes
- **Poser des questions** aux peintres de la communauté
- **Contribuer** en créant du contenu (espace peintre)
- **Modérer** les contributions (espace administrateur)

L'application tourne entièrement côté navigateur en mode démo : les données sont stockées dans le `localStorage`, sans serveur backend pour l'instant. C'est un excellent terrain d'apprentissage : on voit React et Next.js « en vrai », sans la complexité d'une API distante.

### 1.2 Pourquoi apprendre avec ce projet ?

| Avantage                        | Explication                                                              |
| ------------------------------- | ------------------------------------------------------------------------ |
| **Projet réel**          | Pas un « todo list » générique — domaine métier concret (peinture) |
| **Next.js 16 + React 19** | Stack moderne, proche de ce qu'on trouve en entreprise                   |
| **TypeScript**            | Typage fort, bonnes pratiques                                            |
| **Patterns variés**      | Routing, Context, formulaires, guards, canvas HTML5                      |
| **Progression naturelle** | Du visiteur anonyme à l'admin, chaque rôle expose un concept           |

### 1.3 Comment utiliser ce cours

**Première lecture (parcours linéaire)**

1. Lisez les chapitres 1 à 3 pour comprendre le contexte.
2. Parcourez les chapitres 4 à 8 pour les bases React/Next.js illustrées par le code.
3. Approfondissez les chapitres 9 à 14 pour la logique métier.
4. Terminez par les chapitres 15 à 18 (TypeScript, canvas, CSS, exercices).

**Méthode recommandée**

- Ouvrez **deux fenêtres** : ce document et le code source dans l'éditeur.
- Chaque section cite des fichiers précis — allez les lire immédiatement.
- Lancez `npm run dev` et manipulez l'app en parallèle de la lecture.
- Faites les exercices du chapitre 18 un par un, sans regarder les solutions avant d'avoir essayé.

**Repères visuels dans ce document**

- Les blocs de code avec un chemin de fichier proviennent du projet réel.
- Les schémas ASCII résument des flux complexes.
- Les tableaux comparent des concepts (Server vs Client, statuts de contenu…).

---

## 2. Prérequis et environnement

### 2.1 Ce qu'il faut savoir avant de commencer

**Indispensable :**

- HTML et CSS de base (balises, classes, flexbox rudimentaire)
- JavaScript ES6+ : `const`/`let`, fonctions fléchées, destructuring, `map`/`filter`
- Notions de terminal : `cd`, `npm install`, `npm run dev`

**Utile mais pas bloquant :**

- Première exposition à React (composants, props, `useState`)
- Notions de TypeScript (types, interfaces)

### 2.2 Installation du projet

```bash
# Se placer dans le dossier Frontend
cd Frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000). Vous devriez voir la page d'accueil ArtPlastique.

**Scripts disponibles** (`package.json`) :

| Commande          | Rôle                                                |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`   | Serveur de développement avec rechargement à chaud |
| `npm run build` | Compilation de production                            |
| `npm run start` | Lance l'app compilée                                |
| `npm run lint`  | Vérification ESLint                                 |

### 2.3 Stack technique

| Technologie           | Version          | Rôle dans le projet                      |
| --------------------- | ---------------- | ----------------------------------------- |
| **Next.js**     | 16.x             | Framework React, routage, build           |
| **React**       | 19.x             | Interface utilisateur, hooks, Context     |
| **TypeScript**  | 5.8              | Typage statique                           |
| **ESLint**      | 9.x              | Qualité de code (`eslint-config-next`) |
| **CSS custom**  | —               | Pas de Tailwind, Bootstrap ni CSS Modules |
| **Persistance** | `localStorage` | Pas de base de données ni d'API backend  |

**Ce que le projet n'utilise pas (volontairement)**

- Pas de Redux, Zustand ou autre store externe → React Context suffit
- Pas de Prisma, MongoDB, Supabase → mode démo 100 % client
- Pas de librairie de composants (MUI, shadcn…) → design sur mesure

Le fichier `next.config.ts` est minimal — la configuration par défaut de Next.js 16 suffit :

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

---

## 3. Vue d'ensemble du projet

### 3.1 Les trois espaces utilisateur

```
┌─────────────────────────────────────────────────────────────┐
│                    VISITEUR (public)                        │
│  /  /fiches  /roadmaps  /categories  /techniques  /oeuvres  │
└─────────────────────────────────────────────────────────────┘
                              │
                    /connexion (login / signup)
                              │
          ┌───────────────────┴───────────────────┐
          ▼                                       ▼
┌─────────────────────┐               ┌─────────────────────┐
│   PEINTRE           │               │   ADMIN               │
│ /dashboard/peintre  │               │ /admin                │
│ Créer fiches        │               │ Modérer contenu       │
│ Créer roadmaps      │               │ Gérer peintres        │
│ Répondre questions  │               │ Valider / rejeter     │
└─────────────────────┘               └─────────────────────┘
```

### 3.2 Flux de données simplifié

```
siteContent.ts (données initiales)
        │
        ▼
demoSeed.ts (fusion avec localStorage)
        │
        ▼
DemoStoreContext (état global React)
        │
        ├──► Vues publiques (fiches publiées, roadmaps)
        ├──► Dashboard peintre (mes brouillons, soumissions)
        └──► Admin (file de modération)
```

### 3.3 Carte des routes principales

| URL                    | Fichier page                           | Rôle                |
| ---------------------- | -------------------------------------- | -------------------- |
| `/`                  | `src/app/page.tsx`                   | Accueil              |
| `/fiches`            | `src/app/fiches/page.tsx`            | Liste des fiches     |
| `/fiches/[slug]`     | `src/app/fiches/[slug]/page.tsx`     | Détail d'une fiche  |
| `/roadmaps`          | `src/app/roadmaps/page.tsx`          | Liste des roadmaps   |
| `/roadmaps/[slug]`   | `src/app/roadmaps/[slug]/page.tsx`   | Détail roadmap      |
| `/connexion`         | `src/app/connexion/page.tsx`         | Auth                 |
| `/dashboard/peintre` | `src/app/dashboard/peintre/page.tsx` | Espace peintre       |
| `/admin`             | `src/app/admin/page.tsx`             | Espace admin         |
| `/admin/fiches`      | `src/app/admin/fiches/page.tsx`      | Modération fiches   |
| `/admin/roadmaps`    | `src/app/admin/roadmaps/page.tsx`    | Modération roadmaps |
| `/admin/peintres`    | `src/app/admin/peintres/page.tsx`    | Gestion peintres     |

---

## 4. Les fondamentaux de React (rappel guidé)

### 4.1 Qu'est-ce qu'un composant ?

En React, l'interface est découpée en **composants** — des fonctions qui retournent du JSX (HTML enrichi).

```tsx
// src/app/page.tsx
import { HomePage } from '@/views/HomePage'

export default function Page() {
  return <HomePage />
}
```

Ici, `Page` est un composant Next.js (une « page »). Il délègue tout le contenu à `HomePage`, un composant plus riche dans `src/views/`.

**À retenir :** un composant = une brique réutilisable d'interface.

### 4.2 Props : passer des données d'un parent à un enfant

Les **props** (properties) sont les arguments d'un composant.

```tsx
// src/app/fiches/[slug]/page.tsx
<FicheDetailPage slug={slug} />
```

`FicheDetailPage` reçoit `slug` (ex. `"glacis"`) et peut afficher la fiche correspondante.

### 4.3 État local avec `useState`

Quand une donnée **change** au fil des interactions (formulaire, onglet actif…), on utilise `useState`.

Extrait de `HomePage.tsx` :

```tsx
const [questionText, setQuestionText] = useState('')
const [visitorName, setVisitorName] = useState('')

function handleQuestionSubmit(event: React.FormEvent) {
  event.preventDefault()
  if (!questionText.trim()) return
  askQuestion(questionText, visitorName)
  setQuestionText('')
  setVisitorName('')
}
```

- `questionText` : valeur actuelle du champ
- `setQuestionText` : fonction pour la modifier
- `event.preventDefault()` : empêche le rechargement de la page au submit

### 4.4 Effets de bord avec `useEffect`

`useEffect` exécute du code **après** le rendu, quand certaines dépendances changent. C'est le hook des « effets de bord » : accès au DOM, fetch, timers, redirections.

**Pattern 1 — Chargement au montage (tableau de dépendances vide `[]`)**

```tsx
// DemoStoreContext.tsx — charge la session une seule fois au démarrage
useEffect(() => {
  seedFictionalPainters()
  setSession(loadSession())
  setData(mergeStoredDemoData(loadDemoData()))
  setIsHydrated(true)
}, [])
```

**Pattern 2 — Dessiner sur un canvas quand les données changent**

```tsx
// HomePage.tsx — composant FicheSwatch
useEffect(() => {
  const canvas = canvasRef.current
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return

  canvas.width = 300
  canvas.height = 96
  const segmentWidth = 300 / colors.length
  colors.forEach((color, index) => {
    context.fillStyle = color
    context.fillRect(index * segmentWidth, 0, segmentWidth + 1, 96)
  })
}, [colors])  // ← se relance si le tableau colors change
```

**Pattern 3 — Redirection selon la session**

```tsx
// RequireRole.tsx
useEffect(() => {
  if (!isHydrated) return
  if (!session) {
    router.replace('/connexion')
    return
  }
  if (session.role !== role) {
    router.replace(homePathForRole(session.role))
  }
}, [isHydrated, session, role, router])
```

**Pattern 4 — Lire les paramètres d'URL**

```tsx
// FichesPage.tsx — pré-filtre par catégorie depuis ?cat=Technique
useEffect(() => {
  const category = searchParams.get('cat')
  if (category) {
    setSelectedCategories(new Set([category]))
  }
}, [searchParams])
```

> **Règle mnémotechnique :** si ça touche au monde extérieur au rendu pur (DOM, API, storage, navigation), c'est probablement un `useEffect`.

### 4.5 Références avec `useRef`

`useRef` crée une référence mutable qui **ne déclenche pas de re-render** quand elle change. Usages principaux dans ArtPlastique :

1. **Accéder au DOM** (canvas, input fichier)
2. **Conserver une valeur** entre les renders sans provoquer de mise à jour

```tsx
// HomePage.tsx
const canvasRef = useRef<HTMLCanvasElement | null>(null)

return <canvas ref={canvasRef} width={300} height={96} />
```

```tsx
// PaintCanvas.tsx
const drawCanvasRef = useRef<HTMLCanvasElement | null>(null)
const fileInputRef = useRef<HTMLInputElement | null>(null)
```

**Différence clé `useState` vs `useRef`**

|                         | `useState`                      | `useRef`                        |
| ----------------------- | --------------------------------- | --------------------------------- |
| Re-render au changement | Oui                               | Non                               |
| Cas d'usage             | Données affichées à l'écran   | Référence DOM, valeur technique |
| Exemple projet          | `questionText`, `activePanel` | `canvasRef`, `fileInputRef`   |

### 4.6 Listes et clés (`key`)

Quand on affiche une liste avec `.map()`, React a besoin d'une prop `key` unique pour identifier chaque élément et optimiser les mises à jour.

```tsx
// FichesPage.tsx — grille de fiches
{filtered.map((fiche) => (
  <Link key={fiche.slug} href={`/fiches/${fiche.slug}`} className="fiche-card">
    ...
    {fiche.tags.slice(0, 3).map((tag) => (
      <span key={tag} className="tag">{tag}</span>
    ))}
  </Link>
))}
```

```tsx
// PublicShell.tsx — navigation
{publicNav.map((item) => (
  <Link key={item.to} href={item.to} className="topnav-link">
    {item.label}
  </Link>
))}
```

**Bonnes pratiques :**

- Utilisez un identifiant **stable et unique** : `fiche.slug`, `item.to`, `category`
- Évitez l'index de tableau (`key={index}`) si l'ordre peut changer
- Sans `key`, React affiche un avertissement en console et peut mal recycler les composants

---

## 5. Next.js et le App Router

### 5.1 Next.js vs React seul

**React seul** gère l'interface. **Next.js** ajoute :

- Le **routage par fichiers** (un fichier = une URL)
- Le **rendu côté serveur** (SSR) et la génération statique
- Des optimisations (images, fonts, bundling)

Dans ArtPlastique, on utilise surtout le **App Router** (dossier `src/app/`).

### 5.2 Le fichier `layout.tsx` — la coquille globale

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { DemoProvider } from '@/components/DemoProvider'
import PaintCanvas from '@/components/PaintCanvas'
import { FloatingQuestionWidget } from '@/components/FloatingQuestionWidget'
import './globals.css'

export const metadata: Metadata = {
  title: 'ArtPlastique',
  description: 'Référence pour les fiches techniques, les roadmaps et les espaces peintres.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <DemoProvider>
          {children}
          <PaintCanvas />
          <FloatingQuestionWidget />
        </DemoProvider>
      </body>
    </html>
  )
}
```

**Rôle :**

- Enveloppe **toutes** les pages
- Injecte le `DemoProvider` (état global)
- Affiche le canvas de peinture et le widget de questions sur tout le site
- `{children}` = le contenu de la page courante

### 5.3 Convention `page.tsx`

Chaque dossier dans `src/app/` peut contenir un `page.tsx` qui devient une route :

```
src/app/fiches/page.tsx     →  /fiches
src/app/connexion/page.tsx  →  /connexion
```

### 5.4 Métadonnées SEO

Next.js permet d'exporter un objet `metadata` depuis un `layout.tsx` ou un `page.tsx` **Server Component** :

```tsx
export const metadata: Metadata = {
  title: 'ArtPlastique',
  description: 'Référence pour les fiches techniques, les roadmaps et les espaces peintres.',
  icons: { icon: '/favicon.svg' },
}
```

**Effet concret :**

- L'onglet du navigateur affiche « ArtPlastique »
- Les moteurs de recherche lisent la `description`
- Le favicon apparaît dans l'onglet

Pour des métadonnées **dynamiques** par fiche (titre = nom de la fiche), on utiliserait `generateMetadata` dans la page `[slug]` — non implémenté ici car les données sont côté client.

### 5.5 Alias d'import `@/`

Configuré dans `tsconfig.json` :

```json
"paths": {
  "@/*": ["./src/*"]
}
```

Permet d'écrire :

```tsx
import { HomePage } from '@/views/HomePage'
import { useDemoStore } from '@/context/DemoStoreContext'
```

Au lieu de chemins relatifs fragiles :

```tsx
import { HomePage } from '../../../views/HomePage'  // à éviter
```

---

## 6. Architecture des dossiers

### 6.1 Arborescence commentée

```
Frontend/
├── src/
│   ├── app/              # Routes Next.js (pages, layouts)
│   │   ├── layout.tsx    # Layout racine
│   │   ├── page.tsx      # Page d'accueil (/)
│   │   ├── fiches/       # Routes /fiches et /fiches/[slug]
│   │   ├── roadmaps/
│   │   ├── connexion/
│   │   ├── dashboard/
│   │   └── admin/
│   │
│   ├── views/            # Composants « page » (logique UI lourde)
│   │   ├── HomePage.tsx
│   │   ├── FichesPage.tsx
│   │   ├── FicheDetailPage.tsx
│   │   ├── AuthPage.tsx
│   │   └── ...
│   │
│   ├── components/       # Composants réutilisables
│   │   ├── PublicShell.tsx
│   │   ├── PainterShell.tsx
│   │   ├── RequireRole.tsx
│   │   ├── PaintCanvas.tsx
│   │   └── ...
│   │
│   ├── context/          # React Context (état global)
│   │   └── DemoStoreContext.tsx
│   │
│   ├── data/             # Données statiques et seeds
│   │   ├── siteContent.ts
│   │   ├── siteContent/fiches/   # Fiches extraites (modulaires)
│   │   ├── demoSeed.ts
│   │   └── mockUsers.ts
│   │
│   ├── lib/              # Utilitaires purs
│   │   ├── demoStorage.ts
│   │   ├── slugify.ts
│   │   ├── ficheUtils.ts
│   │   └── aiPaintService.ts
│   │
│   └── types/            # Types TypeScript partagés
│       └── content.ts
│
├── package.json
├── tsconfig.json
└── next.config.ts
```

### 6.2 Séparation `app/` vs `views/`

| Dossier         | Responsabilité                                                |
| --------------- | -------------------------------------------------------------- |
| `app/`        | **Routing** — fichiers minces qui composent shell + vue |
| `views/`      | **Contenu** — formulaires, listes, logique d'affichage  |
| `components/` | **Briques** — shells, guards, widgets réutilisables    |

**Pourquoi ?** Next.js impose que les pages vivent dans `app/`. En extrayant la logique dans `views/`, on garde les fichiers de route lisibles et testables.

### 6.3 Rôle de chaque couche

| Couche          | Fichiers types | Dépend de React ? | Exemple                                |
| --------------- | -------------- | ------------------ | -------------------------------------- |
| `data/`       | `.ts`        | Non                | `siteContent.ts`, `mockUsers.ts`   |
| `lib/`        | `.ts`        | Non                | `slugify()`, `loadSession()`       |
| `types/`      | `.ts`        | Non                | `DemoFiche`, `FicheFormInput`      |
| `context/`    | `.tsx`       | Oui                | `DemoStoreContext`                   |
| `components/` | `.tsx`       | Oui                | `PublicShell`, `RequireRole`       |
| `views/`      | `.tsx`       | Oui                | `HomePage`, `DashboardPeintrePage` |
| `app/`        | `.tsx`       | Mixte              | `page.tsx` (souvent Server)          |

**Règle d'or :** plus on descend dans la liste, plus le code est proche de l'interface. Les fonctions pures (`lib/`, `types/`) sont réutilisables partout, y compris hors React.

---

## 7. Le routage : pages publiques et routes dynamiques

### 7.1 Routes statiques

Une URL fixe = un dossier avec `page.tsx`.

```
/fiches  →  src/app/fiches/page.tsx
```

### 7.2 Routes dynamiques avec `[slug]`

Les crochets créent un **segment variable** :

```
/fiches/glacis     →  slug = "glacis"
/fiches/lavis      →  slug = "lavis"
```

```tsx
// src/app/fiches/[slug]/page.tsx
type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  return (
    <PublicShell>
      <FicheDetailPage slug={slug} />
    </PublicShell>
  )
}
```

> **Note Next.js 15+ :** `params` est une `Promise` qu'il faut `await`.

### 7.3 Navigation avec `Link`

```tsx
import Link from 'next/link'

<Link href="/fiches">Fiches</Link>
<Link href={`/fiches/${fiche.slug}`}>{fiche.title}</Link>
```

`Link` précharge les pages et évite le rechargement complet (navigation « SPA »).

### 7.4 `useRouter` et `usePathname`

Ces hooks viennent de `next/navigation` et ne fonctionnent que dans des **Client Components**.

**`useRouter()` — navigation programmatique**

```tsx
import { useRouter } from 'next/navigation'

const router = useRouter()

// Après connexion réussie
router.push(result.redirectTo)

// Redirection sans historique (RequireRole)
router.replace('/connexion')

// Après déconnexion (PainterShell)
logout()
router.push('/connexion')
```

**`usePathname()` — lire l'URL courante**

```tsx
import { usePathname } from 'next/navigation'

const pathname = usePathname()

// PublicShell : pas de header/footer sur l'accueil
if (pathname === '/') {
  return <>{children}</>
}

// ControlShell : surligner l'item actif du menu admin
const isActive = pathname === item.to
```

**`useSearchParams()` — lire les query strings**

```tsx
// FichesPage.tsx
const searchParams = useSearchParams()
const category = searchParams.get('cat')  // ex. /fiches?cat=Technique
```

### 7.5 Page 404

```tsx
// src/app/not-found.tsx
import { redirect } from 'next/navigation'

export default function NotFound() {
  redirect('/')
}
```

Dans ce projet, toute URL inconnue redirige vers l'accueil plutôt que d'afficher une page 404 classique. On pourrait aussi rendre un vrai composant 404 avec un lien « Retour à l'accueil ».

---

## 8. Composants Client vs Server

### 8.1 La directive `'use client'`

Par défaut, les composants App Router sont des **Server Components**. Pour les hooks React, marquez le fichier :

```tsx
'use client'

import { useState } from 'react'
```

**Dans ArtPlastique**, presque toute la logique interactive est en `'use client'` :

- `views/*`
- `components/*`
- `context/DemoStoreContext.tsx`

Les fichiers `app/**/page.tsx` restent souvent **sans** `'use client'`.

### 8.2 Pourquoi cette séparation ?

| Server Component                   | Client Component                   |
| ---------------------------------- | ---------------------------------- |
| Pas de JS interactif envoyé       | JS interactif                      |
| Pas de`window`, `localStorage` | `useState`, `onClick`, storage |
| Meilleur SEO, chargement initial   | Interactivité                     |

### 8.3 L'hydratation et `isHydrated`

Le `localStorage` n'existe pas côté serveur. Au premier rendu, la session est `null`. Après le montage client :

```tsx
const [isHydrated, setIsHydrated] = useState(false)

useEffect(() => {
  setSession(loadSession())
  setData(mergeStoredDemoData(loadDemoData()))
  setIsHydrated(true)
}, [])
```

Les pages affichent un spinner tant que `!isHydrated` pour éviter un « flash » de contenu incorrect ou une redirection prématurée.

### 8.4 Arbre des composants client

```
RootLayout (Server)
└── DemoProvider (Client)
    ├── page courante (Server ou Client selon la route)
    │   └── PublicShell / PainterGate+PainterShell / AdminGate+ControlShell (Client)
    │       └── HomePage / FichesPage / DashboardPeintrePage… (Client)
    ├── PaintCanvas (Client)          ← toujours monté
    └── FloatingQuestionWidget (Client)
```

**Point important :** un Server Component peut importer un Client Component, mais pas l'inverse. C'est pourquoi les `page.tsx` restent minces et délèguent aux `views/`.

---

## 9. Les layouts et shells (coquilles d'interface)

### 9.1 `PublicShell` — navigation visiteur

Enveloppe les pages publiques (sauf l'accueil qui a sa propre nav intégrée) :

```tsx
// src/components/PublicShell.tsx
export function PublicShell({ children }: PublicShellProps) {
  const pathname = usePathname()

  if (pathname === '/') {
    return <>{children}</>
  }

  return (
    <div className="app-shell public-shell">
      <header className="topbar">...</header>
      <main>{children}</main>
      <footer className="site-footer">...</footer>
    </div>
  )
}
```

### 9.2 `PainterShell` — espace peintre

`PainterShell` fournit la sidebar et la topbar du dashboard peintre. Contrairement à `PublicShell`, la navigation interne utilise des **boutons** (pas des routes Next.js séparées) car tout le dashboard est une **SPA à panneaux** dans `DashboardPeintrePage`.

```tsx
// src/components/PainterShell.tsx
export function PainterShell({ children, activePanel = 'overview', onNavigate }: PainterShellProps) {
  const { session, logout, questions } = useDemoStore()
  const pendingQuestionsCount = questions.filter((q) => q.status === 'pending').length

  return (
    <div className="painter-shell">
      <aside className="sidebar painter-sidebar sidebar--dark">
        {/* Avatar, nom, navigation par panneaux */}
        <button onClick={() => onNavigate?.('editeur')}>Nouvelle fiche</button>
        <button onClick={() => onNavigate?.('questions')}>
          Questions visiteurs {pendingQuestionsCount > 0 && `(${pendingQuestionsCount})`}
        </button>
      </aside>
      <main className="main painter-main">{children}</main>
    </div>
  )
}
```

Le badge de questions en attente est **dynamique** : il lit `questions` depuis le Context.

### 9.3 `ControlShell` — espace admin

`ControlShell` utilise des vrais liens `Link` vers des sous-routes admin (`/admin/fiches`, `/admin/peintres`…) :

```tsx
// src/components/ControlShell.tsx
const navGroups = [
  {
    label: 'Contenu',
    items: [
      { label: 'Fiches techniques', to: '/admin/fiches', icon: '◧' },
      { label: 'Roadmaps', to: '/admin/roadmaps', icon: '⬡' },
    ],
  },
  // ...
]

export function ControlShell({ children }: ControlShellProps) {
  const pathname = usePathname()
  // isActive = pathname === item.to
  return (
    <div className="admin-shell">
      <aside className="sidebar">...</aside>
      <main className="main">{children}</main>
    </div>
  )
}
```

### 9.4 Layout imbriqué admin

```tsx
// src/app/admin/layout.tsx
import { AdminGate } from '@/components/AdminGate'
import { ControlShell } from '@/components/ControlShell'

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminGate>
      <ControlShell>{children}</ControlShell>
    </AdminGate>
  )
}
```

**Toute page sous `/admin/*` hérite automatiquement de :**

1. `AdminGate` → vérifie le rôle `admin`
2. `ControlShell` → sidebar + topbar admin

C'est le pattern **layout imbriqué** de Next.js : pas besoin de répéter le shell dans chaque `page.tsx` admin.

### 9.5 Composition : shell + contenu

| Zone    | Pattern                                                 | Fichier page                       |
| ------- | ------------------------------------------------------- | ---------------------------------- |
| Public  | `<PublicShell><MaVue /></PublicShell>`                | `app/fiches/page.tsx`            |
| Peintre | `<PainterGate><DashboardPeintrePage /></PainterGate>` | `app/dashboard/peintre/page.tsx` |
| Admin   | Layout automatique via`admin/layout.tsx`              | `app/admin/page.tsx`             |

```tsx
// app/dashboard/peintre/page.tsx
export default function Page() {
  return (
    <PainterGate>
      <DashboardPeintrePage />
    </PainterGate>
  )
}
```

`DashboardPeintrePage` utilise lui-même `<PainterShell>` en interne pour la navigation par panneaux.

---

## 10. Gestion d'état avec React Context

### 10.1 Le problème du « prop drilling »

Sans Context, il faudrait passer `session`, `fiches`, `login`… à travers dizaines de composants. Le **Context API** centralise l'état.

### 10.2 `DemoStoreContext` — le cœur de l'app

Fichier : `src/context/DemoStoreContext.tsx` (~620 lignes)

| Catégorie    | Exemples                                                       |
| ------------- | -------------------------------------------------------------- |
| Session       | `session`, `login`, `logout`, `register`               |
| Données      | `fiches`, `roadmaps`, `questions`                        |
| Filtres       | `publishedFiches`, `publishedRoadmaps`                     |
| CRUD fiches   | `saveFicheDraft`, `submitFicheForReview`, `approveFiche` |
| CRUD roadmaps | `saveRoadmapDraft`, `submitRoadmapForReview`, …           |
| Utilitaires   | `getFicheBySlug`, `getMyFiches`, `askQuestion`           |

### 10.3 Créer et consommer un contexte

```tsx
// Provider (layout.tsx via DemoProvider)
<DemoStoreProvider>{children}</DemoStoreProvider>

// Consumer (n'importe quel composant enfant)
const { publishedFiches, askQuestion, isHydrated } = useDemoStore()
```

Le hook `useDemoStore()` lance une erreur explicite si utilisé hors du Provider :

```tsx
if (!context) {
  throw new Error('useDemoStore must be used within DemoStoreProvider')
}
```

### 10.4 `useCallback` et `useMemo`

Le Context recrée son objet `value` à chaque render. Sans optimisation, tous les consommateurs se re-rendraient inutilement.

**`useCallback`** — mémorise une **fonction** :

```tsx
const login = useCallback((email: string, password: string): LoginResult => {
  // ... logique de connexion
  saveSession(nextSession)
  setSession(nextSession)
  return { ok: true, redirectTo: '/admin' }
}, [])  // dépendances vides = fonction stable
```

**`useMemo`** — mémorise une **valeur calculée** :

```tsx
const publishedFiches = useMemo(
  () => data.fiches.filter((f) => f.status === 'published'),
  [data.fiches],
)

const value = useMemo(() => ({
  session,
  publishedFiches,
  login,
  logout,
  // ... toutes les propriétés exposées
}), [session, publishedFiches, login, logout, /* ... */])
```

**Pourquoi c'est important ici :** `DemoStoreContext` expose ~30 propriétés. `useMemo` sur `value` évite que `HomePage`, `FichesPage`, `PaintCanvas`… se re-rendent tous quand seul un champ sans rapport change.

### 10.5 Pattern « résultat typé »

Au lieu de lancer des exceptions ou retourner `null`, les actions métier retournent un **union type** :

```ts
type LoginResult =
  | { ok: true; redirectTo: string }
  | { ok: false; error: string }

type SaveContentResult =
  | { ok: true; slug: string; status: ContentStatus }
  | { ok: false; error: string }
```

**Utilisation côté UI :**

```tsx
const result = saveFicheDraft(form, editingFicheSlug)
if (!result.ok) {
  setEditorMessage({ type: 'error', text: result.error })
  return
}
setEditingFicheSlug(result.slug)
setEditorMessage({ type: 'success', text: 'Brouillon enregistré.' })
```

TypeScript **rétrécit** le type après `if (!result.ok)` : dans le bloc `else`, `result.slug` est garanti d'exister. C'est une *discriminated union* — le champ `ok` sert de discriminant.

---

## 11. Persistance locale (mode démo)

### 11.1 `localStorage` en bref

| Clé                              | Contenu                                    |
| --------------------------------- | ------------------------------------------ |
| `artplastique-demo-session`     | Utilisateur connecté (`DemoSession`)    |
| `artplastique-demo-data`        | Fiches, roadmaps, questions (`DemoData`) |
| `artplastique-registered-users` | Comptes peintres créés via signup        |

Fichier : `src/lib/demoStorage.ts`

### 11.2 Garde `typeof window`

```ts
export function loadSession(): DemoSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as DemoSession
  } catch {
    return null
  }
}
```

Next.js exécute du code côté serveur où `window` n'existe pas.

### 11.3 Fusion seed + stockage

```ts
// demoSeed.ts
export function createInitialDemoData(): DemoData {
  return {
    fiches: [...seededFiches, extraDraft],      // fiches de siteContent.ts + brouillon démo
    roadmaps: [...seededRoadmaps, extraRoadmapDraft],
    questions: seededQuestions,
  }
}

export function mergeStoredDemoData(stored: Partial<DemoData> | null): DemoData {
  const initial = createInitialDemoData()
  if (!stored) return initial

  return {
    fiches: stored.fiches ?? initial.fiches,
    roadmaps: stored.roadmaps ?? initial.roadmaps,
    questions: stored.questions ?? initial.questions,
  }
}
```

**Logique :**

1. Au premier lancement → données seed (fiches riches de `siteContent.ts`, quelques brouillons, questions fictives)
2. Après modifications → tout est sauvegardé dans `localStorage` via `saveDemoData()`
3. Au rechargement → `mergeStoredDemoData(loadDemoData())` restaure l'état utilisateur

Les fiches seed reçoivent des métadonnées démo :

```ts
const seededFiches: DemoFiche[] = seedFiches.map((fiche, index) => ({
  ...fiche,
  authorId: 'marie',
  status: index === 0 ? 'review' : 'published',  // 1ère fiche en modération pour tester
  createdAt: '2025-05-01T09:00:00.000Z',
  updatedAt: now,
}))
```

### 11.4 `resetDemoData`

Bouton dans le dashboard admin :

```tsx
// AdminPage.tsx
<button type="button" className="topbar-btn" onClick={resetDemoData}>
  Réinitialiser les données de démo
</button>
```

```ts
// DemoStoreContext.tsx
const resetDemoData = useCallback(() => {
  clearDemoData()                        // efface localStorage (data + session partielle)
  persistData(createInitialDemoData())   // recharge les seeds
}, [persistData])
```

Utile pour revenir à l'état initial après des tests (création de fiches, modération, etc.).

---

## 12. Authentification et rôles

### 12.1 Les trois rôles

| Rôle    | Email démo                 | Mot de passe                      | Redirection            |
| -------- | --------------------------- | --------------------------------- | ---------------------- |
| Visiteur | —                          | —                                | Pages publiques        |
| Peintre  | compte créé via signup    | `demo` (ou mot de passe choisi) | `/dashboard/peintre` |
| Admin    | `admin@artplastique.demo` | `demo`                          | `/admin`             |

### 12.2 Flux de connexion

```
AuthPage → login(email, password)
    → vérifie demoUsers (admin) puis registeredUsers (peintres)
    → saveSession() dans localStorage
    → router.push(redirectTo)
```

Si un utilisateur déjà connecté visite `/connexion`, il est redirigé automatiquement :

```tsx
useEffect(() => {
  if (!isHydrated || !session) return
  router.replace(homePathForRole(session.role))
}, [isHydrated, session, router])
```

### 12.3 `RequireRole` — garde de route

```tsx
export function RequireRole({ role, children }: RequireRoleProps) {
  const { session, isHydrated } = useDemoStore()
  const router = useRouter()

  useEffect(() => {
    if (!isHydrated) return
    if (!session) {
      router.replace('/connexion')
      return
    }
    if (session.role !== role) {
      router.replace(homePathForRole(session.role))
    }
  }, [isHydrated, session, role, router])

  if (!isHydrated) return <Spinner />
  if (!session || session.role !== role) return null
  return children
}
```

### 12.4 `AdminGate` et `PainterGate`

Ce sont des **wrappers fins** autour de `RequireRole` — pattern « composant spécialisé » :

```tsx
// AdminGate.tsx
export function AdminGate({ children }: { children: ReactNode }) {
  return <RequireRole role="admin">{children}</RequireRole>
}

// PainterGate.tsx
export function PainterGate({ children }: { children: ReactNode }) {
  return <RequireRole role="peintre">{children}</RequireRole>
}
```

**Avantage :** le code appelant est plus lisible (`<PainterGate>` vs `<RequireRole role="peintre">`) et on peut ajouter une logique spécifique plus tard sans toucher chaque page.

### 12.5 Inscription peintre

```tsx
// AuthPage.tsx
function handleRegister(event: React.FormEvent) {
  event.preventDefault()
  const result = register(registerName, registerEmail, registerPassword)
  if (!result.ok) {
    setMessage({ type: 'error', text: result.error })
    return
  }
  router.push(result.redirectTo)
}
```

**Validations dans `register()` :**

- Email admin réservé → erreur
- Nom obligatoire, email valide, mot de passe ≥ 3 caractères
- Email déjà utilisé → erreur
- Création d'un `id` unique (`peintre-${Date.now()}`)
- Sauvegarde dans `registeredUsers` (localStorage)
- Connexion automatique + redirection dashboard

```ts
const newUser = {
  id: 'peintre-' + Date.now(),
  email: normalizedEmail,
  password,
  name: name.trim(),
  handle: name.trim().toLowerCase().replace(/\s+/g, '.'),
  role: 'peintre' as const,
  // ...
}
upsertRegisteredUser(newUser)
saveSession(toSession(newUser))
```

---

## 13. Le modèle de données : fiches et roadmaps

### 13.1 Type `Fiche`

```ts
export type Fiche = {
  slug: string
  title: string
  question: string
  category: string
  tool: string
  duration: string
  level: string
  summary: string
  tags: string[]
  sections: FicheSection[]
  pigmentCode?: string
  swatch?: string[]
}

export type FicheSection = {
  label: string
  title: string
  paragraphs: string[]
}
```

### 13.2 Type `Roadmap`

```ts
export type Roadmap = {
  slug: string
  title: string
  audience: string
  duration: string
  level: string
  summary: string
  steps: RoadmapStep[]
}

export type RoadmapStep = {
  title: string
  description: string
  ficheSlugs: string[]   // liens vers des fiches existantes
}
```

### 13.3 Extension démo : statuts et auteur

```ts
// types/content.ts
export type ContentStatus = 'draft' | 'review' | 'published' | 'rejected'

export type DemoFiche = Fiche & {
  authorId: string
  status: ContentStatus
  createdAt: string
  updatedAt: string
}

export type DemoRoadmap = Roadmap & {
  authorId: string
  status: ContentStatus
  createdAt: string
  updatedAt: string
}
```

Les types de base (`Fiche`, `Roadmap`) décrivent le **contenu éditorial**. Les types `Demo*` ajoutent la **gestion de publication** nécessaire à la plateforme.

Affichage des badges :

```ts
export function statusMeta(status: ContentStatus) {
  switch (status) {
    case 'published': return { label: '● Publié', className: 'badge-published' }
    case 'review':    return { label: '◐ En révision', className: 'badge-review' }
    case 'rejected':  return { label: '✕ Rejetée', className: 'badge-draft' }
    default:          return { label: '○ Brouillon', className: 'badge-draft' }
  }
}
```

### 13.4 Organisation des fiches dans `data/`

Le fichier principal `siteContent.ts` contient la majorité des fiches inline (tableau `fiches: Fiche[]`).

Certaines fiches volumineuses sont **extraites** dans des modules séparés pour la lisibilité :

```
src/data/siteContent/fiches/
├── fiche-lavis.ts
├── fiche-glacis.ts        (si extrait)
├── fiche-pinceaux.ts
└── ...
```

Exemple d'un module extrait :

```ts
// fiche-lavis.ts
import type { Fiche } from '../types'

export const ficheLavis: Fiche = {
  slug: 'lavis',
  title: 'Le lavis',
  question: 'Comment maîtriser le lavis en peinture ?',
  category: 'Technique',
  sections: [
    { label: 'Définition', title: 'La couche transparente', paragraphs: ['...'] },
    // ...
  ],
}
```

**Pattern modulaire :** un fichier = une fiche = export nommé. On peut ensuite les réimporter dans `siteContent.ts` avec un spread ou un `concat`.

### 13.5 Génération de slugs

```ts
// lib/slugify.ts
export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')                              // décompose les accents
    .replace(/[\u0300-\u036f]/g, '')              // supprime les diacritiques
    .replace(/[^a-z0-9]+/g, '-')                  // remplace espaces/symboles par -
    .replace(/^-+|-+$/g, '')                       // trim les tirets
}

export function uniqueSlug(base: string, existing: string[]) {
  let slug = slugify(base)
  if (!slug) slug = `fiche-${Date.now()}`
  if (!existing.includes(slug)) return slug

  let index = 2
  while (existing.includes(`${slug}-${index}`)) {
    index += 1
  }
  return `${slug}-${index}`
}
```

Exemples :

- `"Le glacis"` → `le-glacis`
- `"Le glacis"` (déjà pris) → `le-glacis-2`
- Titre vide → `fiche-1719667200000`

---

## 14. Workflow éditorial (brouillon → publication)

### 14.1 Les statuts de contenu

```
draft  →  review  →  published
                 ↘  rejected
```

| Statut        | Visible public | Modifiable par l'auteur     |
| ------------- | -------------- | --------------------------- |
| `draft`     | Non            | Oui                         |
| `review`    | Non            | Oui (en attente)            |
| `published` | Oui            | Non (sauf nouvelle version) |
| `rejected`  | Non            | Oui                         |

Seules les fiches/roadmaps `published` apparaissent dans `publishedFiches` et `publishedRoadmaps`.

### 14.2 Parcours peintre

**Étape 1 — Créer ou répondre à une question**

```tsx
// DashboardPeintrePage.tsx
function openEditorForQuestion(questionText: string, questionId: string) {
  setForm({
    ...emptyFicheForm(),
    question: questionText,
    title: questionText.replace('?', '').replace('Comment ', ''),
  })
  setAnsweringQuestionId(questionId)
  setActivePanel('editeur')
}
```

**Étape 2 — Enregistrer un brouillon**

```tsx
function handleSaveDraft() {
  const result = saveFicheDraft(form, editingFicheSlug, answeringQuestionId)
  if (!result.ok) {
    setEditorMessage({ type: 'error', text: result.error })
    return
  }
  setEditingFicheSlug(result.slug)
  setEditorMessage({ type: 'success', text: 'Brouillon enregistré.' })
}
```

**Étape 3 — Soumettre à modération**

```tsx
function handleSubmitForReview() {
  const result = submitFicheForReview(form, editingFicheSlug, answeringQuestionId)
  if (!result.ok) { /* erreur */ return }
  setEditorMessage({
    type: 'success',
    text: 'Fiche soumise à modération. Un administrateur doit l\'approuver pour publication.',
  })
  setActivePanel('fiches')
}
```

**Étape 4 — Admin approuve**

```tsx
// AdminPage.tsx
<button onClick={() => approveFiche(fiche.slug)}>✓</button>
```

`approveFiche` passe le statut de `review` à `published`. La fiche apparaît immédiatement sur `/fiches`.

### 14.3 File de modération admin

```ts
const getModerationQueue = useCallback(
  () => data.fiches.filter((f) => f.status === 'review'),
  [data.fiches],
)
```

Affichage dans `AdminPage` :

```tsx
const moderationQueue = getModerationQueue()

{moderationQueue.map((fiche) => (
  <div key={fiche.slug} className="mod-item">
    <div className="mod-title">{fiche.title}</div>
    <button onClick={() => approveFiche(fiche.slug)}>✓</button>
    <button onClick={() => rejectFiche(fiche.slug)}>✕</button>
  </div>
))}
```

Pages dédiées : `/admin/fiches` et `/admin/roadmaps` pour une modération plus complète (sélection multiple, suppression…).

### 14.4 Questions visiteurs → fiches

```
Visiteur (HomePage)
    │ askQuestion(text, name)
    ▼
questions[] status: 'pending'
    │
    ▼
Peintre voit la question (panel 'questions')
    │ openEditorForQuestion()
    ▼
Crée une fiche liée (questionId passé à saveFicheDraft)
    │
    ▼
DemoStoreContext met à jour la question :
    status: 'answered', ficheSlug: slug
```

```ts
// Dans upsertFiche, si questionId fourni :
nextQuestions = nextQuestions.map((q) =>
  q.id === questionId ? { ...q, status: 'answered', ficheSlug: slug } : q
)
```

---

## 15. TypeScript dans le projet

### 15.1 Pourquoi TypeScript ?

- Erreurs détectées à la compilation
- Autocomplétion dans l'éditeur
- Documentation vivante des structures de données

### 15.2 Types vs interfaces

Le projet utilise principalement `type` :

```ts
export type Fiche = { slug: string; title: string; ... }
export type ContentStatus = 'draft' | 'review' | 'published' | 'rejected'
```

**Pourquoi `type` ici ?**

- Unions de littéraux (`ContentStatus`) — idiomatique avec `type`
- Intersection (`DemoFiche = Fiche & { ... }`) — très lisible
- Pas besoin de `interface` mergeable (pattern classes)

On pourrait utiliser `interface` pour les objets extensibles, mais `type` est cohérent dans tout le projet.

### 15.3 Types utilitaires du projet

| Type                  | Rôle                                                          |
| --------------------- | -------------------------------------------------------------- |
| `FicheFormInput`    | Champs du formulaire d'édition (tags en string, pas en array) |
| `RoadmapFormInput`  | Formulaire roadmap avec`steps: RoadmapStepInput[]`           |
| `SaveContentResult` | `{ ok: true, slug, status } \| { ok: false, error }`          |
| `ContentStatus`     | Union`'draft' \| 'review' \| 'published' \| 'rejected'`         |
| `VisitorQuestion`   | Questions posées sur l'accueil                                |
| `DemoData`          | `{ fiches, roadmaps, questions }` — structure localStorage  |
| `DemoSession`       | Session utilisateur connecté                                  |
| `UserRole`          | `'peintre' \| 'admin'`                                        |

**Helpers de conversion formulaire ↔ objet :**

```ts
export function ficheToForm(fiche: DemoFiche): FicheFormInput { ... }
export function buildSections(input: FicheFormInput): FicheSection[] { ... }
export function parseTags(raw: string): string[] {
  return raw.split(',').map((tag) => tag.trim()).filter(Boolean)
}
```

### 15.4 `Readonly` et props Next.js

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) { ... }
```

`Readonly<>` empêche la mutation accidentelle des props. `React.ReactNode` accepte tout ce que React peut rendre (éléments, texte, fragments, `null`).

`strict: true` dans `tsconfig.json` active les vérifications strictes (null checks, etc.).

---

## 16. Le canvas de peinture (PaintCanvas)

### 16.1 Présentation

`PaintCanvas` est un widget global monté dans `layout.tsx`. Il offre :

- Plusieurs outils de dessin (crayon, pinceau, formes, gomme, remplissage…)
- Palettes de couleurs artistiques
- Undo/redo, export PNG
- Mode IA (génération de dessin selon le contexte de la page)

Fichier : `src/components/PaintCanvas.tsx` (~1300 lignes)

### 16.2 Concepts HTML5 Canvas

**Deux calques canvas** (fond + dessin) pour séparer le background du tracé :

```tsx
const drawCanvasRef = useRef<HTMLCanvasElement | null>(null)
const bgCanvasRef = useRef<HTMLCanvasElement | null>(null)

// Obtenir le contexte 2D
const ctx = drawCanvasRef.current?.getContext('2d')
```

**Événements souris pour dessiner :**

```tsx
function onMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
  isDrawing.current = true
  const { x, y } = getCanvasCoords(e)
  ctx.beginPath()
  ctx.moveTo(x, y)
}

function onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
  if (!isDrawing.current) return
  const { x, y } = getCanvasCoords(e)
  ctx.lineTo(x, y)
  ctx.stroke()
}

function onMouseUp() {
  isDrawing.current = false
}
```

**Remplissage (flood fill)** — algorithme par pile dans `PaintCanvas.tsx` :

```ts
function floodFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: string) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  // parcours en largeur des pixels de même couleur...
  ctx.putImageData(imageData, 0, 0)
}
```

### 16.3 Palettes et outils

```ts
const PALETTES = {
  terres: {
    label: 'Terres & Tradition',
    colors: ['#201712', '#3f2c22', '#5b3221', '#9d6a3b', ...]
  },
  impressionniste: { label: 'Impressionnisme', colors: [...] },
  pop: { label: 'Pop / Moderne', colors: [...] },
  monochrome: { label: 'Monochrome', colors: [...] },
} as const

const TOOLS = [
  { id: 'pencil', label: 'Crayon', icon: '✏️' },
  { id: 'brush', label: 'Pinceau', icon: '🖌️' },
  { id: 'eraser', label: 'Gomme', icon: '⬜' },
  { id: 'fill', label: 'Remplir', icon: '🪣' },
  // ...
] as const

const SIZES = [2, 4, 8, 14, 22, 32, 48]
```

`as const` fige les types en littéraux — TypeScript infère `PaletteType = 'terres' | 'impressionniste' | ...`.

### 16.4 Intégration IA (`aiPaintService`)

Le service définit des **commandes de dessin** sérialisables :

```ts
export type DrawCommand =
  | { action: 'setBg'; color: string }
  | { action: 'setColor'; color: string }
  | { action: 'line'; x1: number; y1: number; x2: number; y2: number }
  | { action: 'circle'; cx: number; cy: number; r: number }
  | { action: 'spray'; x: number; y: number; radius: number; density: number }
  // ...
```

`PaintCanvas` construit un contexte depuis la page visitée et appelle l'IA :

```tsx
const handleAiPaint = useCallback(async () => {
  setIsAiPainting(true)
  const context: AIContext = {
    type: 'fiche',
    title: currentFiche?.title ?? 'Art',
    summary: currentFiche?.summary ?? '',
    tags: currentFiche?.tags,
  }
  const commands = await generatePaintCommands(context)
  // exécute chaque commande sur le canvas
  setIsAiPainting(false)
}, [/* ... */])
```

L'IA retourne un tableau JSON de commandes, exécutées une par une sur le canvas — pattern **interpréteur de commandes**.

### 16.5 `FicheSwatch` — mini canvas décoratif

Sur l'accueil, chaque fiche peut afficher un aperçu coloré procédural :

```tsx
function FicheSwatch({ id, colors }: { id: string; colors: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    // bandes de couleur + grain aléatoire (points noirs semi-transparents)
    colors.forEach((color, index) => {
      context.fillStyle = color
      context.fillRect(index * segmentWidth, 0, segmentWidth + 1, height)
    })
    for (let i = 0; i < 800; i++) {
      context.fillStyle = `rgba(0,0,0,${Math.random() * 0.15})`
      context.fillRect(Math.random() * width, Math.random() * height, 1, 1)
    }
  }, [colors])

  return <canvas ref={canvasRef} id={id} width={300} height={96} />
}
```

Même technique sur `FichesPage` via `querySelectorAll` et `data-swatch` — le grain donne un aspect « matière picturale ».

---

## 17. Styles et CSS global

### 17.1 Approche CSS du projet

Un seul fichier global : `src/app/globals.css` (~8000 lignes). Pas de Tailwind ni CSS Modules.

**Variables CSS** (`:root`) :

```css
:root {
  --page: #f8f1e7;
  --surface: #fffdfa;
  --ink: #201712;
  --bone: #2a2019;
  --bone-muted: #7b6b5d;
  --ochre: #9d6a3b;
  --ochre-light: #d6b189;
  --stroke: rgba(42, 32, 25, 0.11);
  --shadow: 0 24px 70px rgba(42, 32, 25, 0.12);
}
```

**Polices** (Google Fonts) :

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins...&family=Playfair+Display...');
```

- `Poppins` — texte courant
- `Playfair Display` — titres élégants
- `DM Mono` — code, données techniques

### 17.2 Organisation des classes

| Préfixe / classe                                         | Usage                    |
| --------------------------------------------------------- | ------------------------ |
| `.app-shell`, `.public-shell`                         | Layout pages publiques   |
| `.painter-shell`, `.painter-sidebar`                  | Dashboard peintre        |
| `.admin-shell`, `.sidebar`                            | Espace admin             |
| `.topbar`, `.topnav-link`                             | Barre de navigation      |
| `.fiches-grid`, `.fiche-card`                         | Grille de fiches         |
| `.auth-guard-loading`, `.auth-guard-spinner`          | État chargement session |
| `.badge-published`, `.badge-review`, `.badge-draft` | Statuts de contenu       |
| `.mod-item`, `.mod-btn.approve`                       | File de modération      |
| `.card`, `.card-header`, `.card-body`               | Cartes dashboard         |

**Exemple badge publié :**

```css
.badge-published {
  background: rgba(106, 118, 98, 0.15);
  color: var(--accent-green);
}
```

Les classes sont **sémantiques** (décrivent le rôle, pas l'apparence) — proche d'une méthodologie BEM simplifiée.

### 17.3 Bonnes pratiques accessibilité

Exemples présents dans le projet :

```tsx
<nav aria-label="Navigation principale">...</nav>
<Link href="/" aria-label="ArtPlastique">...</Link>
<div className="auth-guard-spinner" aria-hidden />
<canvas className="grain-overlay" aria-hidden="true" />
<button aria-label="Notifications">...</button>
```

**Structure sémantique :**

- `<header>`, `<main>`, `<footer>`, `<nav>`, `<aside>` — pas uniquement des `<div>`
- Labels sur les boutons icône seuls
- `aria-hidden` sur les éléments purement décoratifs (spinners, grain canvas)

---

## 18. Exercices pratiques

### Niveau 1 — Découverte

**Exercice 1 — Modifier les métadonnées**

1. Ouvrez `src/app/layout.tsx`
2. Changez `title: 'ArtPlastique'` en `title: 'ArtPlastique — Cours'`
3. Rechargez — l'onglet du navigateur doit refléter le changement

**Exercice 2 — Ajouter un lien de navigation**

1. Dans `src/data/siteContent.ts`, ajoutez à `publicNav` :
   ```ts
   { label: 'À propos', to: '/a-propos' }
   ```
2. Créez `src/app/a-propos/page.tsx` avec un titre simple
3. Vérifiez que le lien apparaît dans le header (hors accueil)

**Exercice 3 — Compteur de fiches**

1. Dans `HomePage.tsx`, affichez `{publishedFiches.length} fiches disponibles`
2. Placez-le dans la section hero ou stats

---

### Niveau 2 — React

**Exercice 4 — Composant `TagList`**

Créez `src/components/TagList.tsx` :

```tsx
type TagListProps = { tags: string[]; max?: number }

export function TagList({ tags, max = 5 }: TagListProps) {
  return (
    <div className="tag-list">
      {tags.slice(0, max).map((tag) => (
        <span key={tag} className="tag">{tag}</span>
      ))}
    </div>
  )
}
```

Utilisez-le dans `FicheDetailPage` ou `FichesPage`.

**Exercice 5 — Filtre par catégorie**

`FichesPage` a déjà un filtre par checkbox. Améliorez-le :

- Ajoutez un filtre par **niveau** (`Débutant`, `Intermédiaire`, `Avancé`)
- Combinez les deux filtres dans le `useMemo` de `filtered`

**Exercice 6 — Expérience `isHydrated`**

1. Commentez temporairement le guard `if (!isHydrated) return <Spinner />` dans `HomePage`
2. Observez le flash : données vides puis données chargées
3. Remettez le guard — comprenez pourquoi il est indispensable avec `localStorage`

---

### Niveau 3 — Next.js

**Exercice 7 — Page `/a-propos` complète**

```tsx
// src/app/a-propos/page.tsx
import { PublicShell } from '@/components/PublicShell'

export default function Page() {
  return (
    <PublicShell>
      <div className="page-header">
        <h1>À propos <em>d'ArtPlastique</em></h1>
        <p>Plateforme de référence pour les arts plastiques.</p>
      </div>
    </PublicShell>
  )
}
```

**Exercice 8 — Route dynamique `/categories/[slug]`**

1. Créez `src/app/categories/[slug]/page.tsx`
2. Affichez les fiches publiées dont `category` correspond au slug (décodé)
3. Liez depuis `/categories` si la page liste les catégories

**Exercice 9 — Server vs Client**

1. Créez une page sans `'use client'` qui affiche seulement du texte statique
2. Ajoutez un `useState` — Next.js affiche une erreur
3. Ajoutez `'use client'` — l'erreur disparaît

---

### Niveau 4 — État et données

**Exercice 10 — Inspecter le localStorage**

1. Créez un compte peintre via `/connexion`
2. Créez une fiche brouillon
3. Ouvrez DevTools → Application → Local Storage
4. Trouvez `artplastique-demo-data` — votre fiche y est en JSON

**Exercice 11 — `getFichesByCategory`**

Ajoutez dans `DemoStoreContext` :

```ts
const getFichesByCategory = useCallback(
  (category: string) => publishedFiches.filter((f) => f.category === category),
  [publishedFiches],
)
```

Exposez-la dans `value` et utilisez-la dans une vue catégorie.

**Exercice 12 — Cycle complet de modération**

1. Connectez-vous en peintre, soumettez une fiche (`submitFicheForReview`)
2. Déconnectez-vous, connectez-vous en admin (`admin@artplastique.demo` / `demo`)
3. Approuvez la fiche dans `/admin`
4. Vérifiez qu'elle apparaît sur `/fiches`

---

### Niveau 5 — Canvas

**Exercice 13 — Canvas minimal**

```tsx
'use client'

import { useRef, useEffect } from 'react'

export function MiniCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#9d6a3b'
    ctx.fillRect(50, 50, 200, 100)
  }, [])

  return <canvas ref={ref} width={300} height={200} />
}
```

**Exercice 14 — Reproduire `FicheSwatch`**

1. Lisez `FicheSwatch` dans `HomePage.tsx`
2. Créez un composant standalone avec une prop `colors: string[]`
3. Affichez-le avec `['#1a3a5c', '#4a7aaa', '#8abadf']`

---

### Projet fil rouge — Page « Mes favoris »

**Objectif :** page listant les fiches bookmarkées, persistance séparée.

**Étapes suggérées :**

1. **Storage** — `src/lib/favoritesStorage.ts` :

   ```ts
   const KEY = 'artplastique-favorites'
   export function loadFavorites(): string[] { ... }  // slugs
   export function toggleFavorite(slug: string): string[] { ... }
   ```
2. **Hook ou Context** — exposez `favorites`, `isFavorite(slug)`, `toggleFavorite(slug)`
3. **UI** — bouton ♥ sur `FicheDetailPage` et `fiche-card`
4. **Route** — `/favoris` avec `PublicShell`, liste des fiches dont le slug est dans `favorites`
5. **Bonus** — compteur dans le header, animation au clic

Ce projet combine : routing, hooks, persistance, filtrage de données, UI — tout le stack du cours.

---

## 19. Annexes

### A. Glossaire

| Terme                             | Définition                                                |
| --------------------------------- | ---------------------------------------------------------- |
| **Composant**               | Fonction React retournant du JSX                           |
| **Props**                   | Données passées à un composant enfant                   |
| **État (state)**           | Donnée mutable interne au composant                       |
| **Context**                 | Mécanisme de state global React                           |
| **Slug**                    | Identifiant URL lisible (`glacis`, `lavis`)            |
| **Hydratation**             | Passage du HTML serveur au React interactif côté client  |
| **App Router**              | Système de routage de Next.js basé sur`app/`           |
| **Server/Client Component** | Composant exécuté serveur vs navigateur                  |
| **Shell**                   | Coquille UI (header, sidebar, footer) autour du contenu    |
| **Gate**                    | Composant guard qui bloque l'accès selon le rôle         |
| **Seed**                    | Données initiales injectées au premier lancement         |
| **Discriminated union**     | Type union avec un champ discriminant (`ok: true/false`) |

### B. Fichiers clés à connaître

| Fichier                                | Importance                      |
| -------------------------------------- | ------------------------------- |
| `src/app/layout.tsx`                 | Point d'entrée UI global       |
| `src/context/DemoStoreContext.tsx`   | Logique métier centrale        |
| `src/data/siteContent.ts`            | Contenu éditorial initial      |
| `src/data/demoSeed.ts`               | Transformation seed → DemoData |
| `src/lib/demoStorage.ts`             | Persistance localStorage        |
| `src/components/RequireRole.tsx`     | Protection des routes           |
| `src/views/HomePage.tsx`             | Accueil, questions, swatches    |
| `src/views/DashboardPeintrePage.tsx` | Éditeur peintre complet        |
| `src/views/AdminPage.tsx`            | Modération et reset démo      |
| `src/components/PaintCanvas.tsx`     | Widget dessin global            |

### C. Comptes et mots de passe démo

| Compte            | Email                                               | Mot de passe                        | Accès                 |
| ----------------- | --------------------------------------------------- | ----------------------------------- | ---------------------- |
| **Admin**   | `admin@artplastique.demo`                         | `demo`                            | `/admin`             |
| **Peintre** | Créer via « Créer un compte » sur`/connexion` | `demo` ou votre choix (≥ 3 car.) | `/dashboard/peintre` |

Sur la page connexion, un bouton « Remplir compte démo admin » appelle `fillDemoAccount('admin@artplastique.demo')`.

L'email admin est **réservé** — impossible de s'inscrire avec.

### D. Ressources externes

| Ressource  | URL                                                                                                      | Pour quoi                     |
| ---------- | -------------------------------------------------------------------------------------------------------- | ----------------------------- |
| React      | [react.dev](https://react.dev)                                                                            | Hooks, composants, Context    |
| Next.js    | [nextjs.org/docs](https://nextjs.org/docs)                                                                | App Router, routing, metadata |
| TypeScript | [typescriptlang.org/docs/handbook](https://www.typescriptlang.org/docs/handbook/)                         | Types, unions, generics       |
| MDN Canvas | [developer.mozilla.org/docs/Web/API/Canvas_API](https://developer.mozilla.org/fr/docs/Web/API/Canvas_API) | API 2D, drawImage, fillRect   |

### E. Changelog du cours

| Date       | Modification                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-06-29 | v1 — Création du document (structure + sections partielles)                                                                                     |
| 2026-06-29 | v2 — Complétion intégrale : React hooks, shells, Context, persistance, auth, workflow, TypeScript, canvas, CSS, exercices détaillés, annexes |

---

*Fin du cours ArtPlastique. Vous disposez maintenant d'une cartographie complète du projet pour progresser en React et Next.js sur une base de code réelle.*