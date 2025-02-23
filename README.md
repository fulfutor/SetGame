# Set-Game

Jeu développé en HTML5 avec React et Vite, déployé via Docker.

## 🚀 Installation & Déploiement

### 1️⃣ Cloner le projet
```sh
git clone https://github.com/ton-repo/set-game.git
cd set-game
```

### 2️⃣ Construire et exécuter le conteneur

#### Avec `docker-compose` (recommandé) :
```sh
docker-compose up --build -d
```

#### Ou en ligne de commande Docker :
```sh
docker build -t set-game .
docker run -d -p 8250:8250 --name set-game set-game
```

### 3️⃣ Accéder à l'application
Ouvre un navigateur et va sur :
```
http://localhost:8250
```

## 🛑 Arrêter et supprimer le conteneur

```sh
docker-compose down
```

Ou si lancé sans `docker-compose` :
```sh
docker stop set-game && docker rm set-game
```

## 📜 Licence
MIT - Faites-en bon usage ! 🎮

