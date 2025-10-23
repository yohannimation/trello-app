# Étape 1 : build du projet
FROM node:18-alpine AS build-stage

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Construire l’application pour la production
RUN npm run build


# Étape 2 : image finale légère avec serveur web
FROM nginx:stable-alpine AS production-stage

# Copier les fichiers buildés depuis l’étape précédente
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
