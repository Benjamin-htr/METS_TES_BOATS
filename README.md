# METS TES BOATS

METS TES BOATS est un projet de développement de simulation maritime. Il s'agit d'un projet réalisé dans les cadre de l'UE de développement web de l'ISEN en quatième année.

## Equipe

- Benjamin Hautier
- Mael Bizot
- Marty Hughes

## Structure du projet

Ce projet utilise une architecture microservices. Ici, cette architecture a été implémentée avec un monorepo via [pnpm](https://pnpm.io/) grâce aux [worskpaces](https://pnpm.io/workspaces).

## Installation

Plusieurs étapes sont nécessaires pour installer le projet :

### Prérequis

Pour installer le projet, il faut, au préalable, installer les outils suivants :

- [NodeJS](https://nodejs.org/en/download) : je conseille de l'installer via [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) qui permet de gérer plusieurs versions de nodeJS sur la même machine (pratique pour jongler entre les projets). ATTENTION : il faut installer une version de node au moins supérieure à la 18.0.0.
- [pnpm](https://pnpm.io/installation) : il s'agit d'un gestionnaire de dépendances qui permet de gérer les dépendances de manière plus efficace que npm ou yarn. Il est aussi utlisé pour gérer les monorepos via les [worskpaces](https://pnpm.io/workspaces).
- [Git](https://git-scm.com/downloads)

### Importation du projet

Pour importer le projet, il faut lancer la commande suivante :

```bash
git clone https://github.com/Benjamin-htr/METS_TES_BOATS.git
```

### Installation des dépendances

Pour installer le projet, il faut d'abord installer les dépendances du projet. Pour cela, il faut lancer la commande suivante (à la racine du projet):

```bash
pnpm install
```

### Lancement du front

Pour lancer le front, il faut lancer la commande suivante (à la racine du monorepo):

```bash
pnpm run --filter main-front dev
```

### Lancement de l'api

Il faut lancer la commande suivante afin de générer le client prisma

```bash
pnpm --filter main-api exec prisma generate
```

Pour lancer l'api, il faut lancer la commande suivante (à la racine du monorepo):

```bash
pnpm run --filter main-api dev
```
