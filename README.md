# METS TES BOATS

METS TES BOATS est un projet de développement de simulation maritime. Il s'agit d'un projet réalisé dans le cadre de l'UE de développement web de l'ISEN en quatrième année.

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

Pour utiliser l'API, il faut une base de données MySQL. Afin de faciliter le test de ce projet en local, j'ai ajouté un docker compose à la racine du monorepo qui permet de lancer une base de données MySQL en local.

Pour cela, il faut installer [Docker](https://www.docker.com/products/docker-desktop) (si vous êtes sur macOS, je vous conseille d'utiliser [Orbstack](https://orbstack.dev/) qui est une alternative à Docker Desktop qui est plus légère et plus rapide).
Une fois Docker installé, il faut se rendre à la racine du projet et lancer la commande suivante (à la racine du monorepo):

```bash
docker-compose up
```

Une fois la base de données MySQL lancée, vous pouvez créer une base de données nommée `main_db` dans votre client MySQL préféré (par exemple [MySQL Workbench](https://www.mysql.com/products/workbench/)).

Il faut lancer la commande suivante afin de générer le client prisma

```bash
pnpm --filter main-api exec prisma generate
```

Vous pouvez ensuite lancer la migration de la base de données. Pour cela, il faut lancer la commande suivante (à la racine du monorepo):

```bash
pnpm --filter main-api exec prisma migrate dev --name init
```

Vous pouvez maintenant lancer la seed de la base de données. Pour cela, il faut lancer la commande suivante (à la racine du monorepo):

```bash
pnpm --filter main-api exec prisma db seed
```

Pour lancer l'api, il faut lancer la commande suivante (à la racine du monorepo):

```bash
pnpm run --filter main-api dev
```

### Utilisation

Rendez vous sur [http://localhost:5001](http://localhost:5001) pour accéder à l'interface du front.

Le seed de la base de données a ajouté un utilisateur avec les identifiants suivants :

- username : `captain_jack`
- password : `pirate1234`

Vous pouvez donc vous connecter avec ces identifiants ou bien créer un nouveau compte sur la page d'inscription.
