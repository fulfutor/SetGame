# Utiliser une image de base officielle Node.js
FROM node:18 AS builder

# Définir le répertoire de travail dans l'image Docker
WORKDIR /app

# Copier le fichier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers du projet dans le répertoire de travail
COPY . .

# Construire le projet Vite React
RUN npm run build

# Utiliser une image plus légère pour exécuter le serveur
FROM nginx:alpine

# Copier les fichiers de build dans le répertoire de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

#Lancer nginx
CMD ["nginx", "-g", "daemon off;"]
