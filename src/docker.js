import { writeFileSync } from "fs";
import { askEnvVariables } from "./env.js";

const getDockerfileContent = (language) => {
    switch (language) {
        case 'Node.js':
            return `FROM node:14\n\n# Définir le répertoire de travail\nWORKDIR /app\n\n# Copier les fichiers package.json et package-lock.json\nCOPY package*.json ./\n\n# Installer les dépendances\nRUN npm install\n\n# Installer le client MySQL ou PostgreSQL\nRUN apt-get update && apt-get install -y mysql-client postgresql-client\n\n# Copier le reste de l'application\nCOPY . .\n\n# Exposer le port d'écoute\nEXPOSE 3000\n\n# Commande pour démarrer l'application\nCMD ["npm", "start"]\n`;
        case 'Python':
            return `FROM python:3.8\n\n# Définir le répertoire de travail\nWORKDIR /app\n\n# Copier les fichiers requirements.txt\nCOPY requirements.txt ./\n\n# Installer les dépendances\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Installer le client MySQL ou PostgreSQL\nRUN apt-get update && apt-get install -y default-mysql-client libpq-dev\n\n# Copier le reste de l'application\nCOPY . .\n\n# Exposer le port d'écoute\nEXPOSE 5000\n\n# Commande pour démarrer l'application\nCMD ["python", "app.py"]\n`;
        case 'PHP':
            return `FROM php:7.4-apache\n\n# Installer le client MySQL\nRUN docker-php-ext-install mysqli pdo pdo_mysql\n\n# Copier le code source de l'application\nCOPY . /var/www/html/\n\n# Exposer le port d'écoute (80 par défaut pour Apache)\nEXPOSE 80\n`;
        case 'Go':
            return `FROM golang:1.17\n\n# Définir le répertoire de travail\nWORKDIR /app\n\n# Installer le client PostgreSQL\nRUN apt-get update && apt-get install -y postgresql-client\n\n# Copier go.mod et go.sum\nCOPY go.mod go.sum ./\n\n# Installer les dépendances\nRUN go mod download\n\n# Copier le reste de l'application\nCOPY . .\n\n# Exposer le port d'écoute\nEXPOSE 8080\n\n# Commande pour démarrer l'application\nCMD ["go", "run", "main.go"]\n`;
        case 'Ruby':
            return `FROM ruby:3.0\n\n# Définir le répertoire de travail\nWORKDIR /app\n\n# Copier le Gemfile et le Gemfile.lock\nCOPY Gemfile Gemfile.lock ./\n\n# Installer les dépendances\nRUN bundle install\n\n# Copier le reste de l'application\nCOPY . .\n\n# Exposer le port d'écoute\nEXPOSE 3000\n\n# Commande pour démarrer l'application\nCMD ["ruby", "app.rb"]\n`;
        case 'Java':
            return `FROM openjdk:11\n\n# Définir le répertoire de travail\nWORKDIR /app\n\n# Copier le fichier JAR de l'application\nCOPY target/myapp.jar ./myapp.jar\n\n# Exposer le port d'écoute\nEXPOSE 8080\n\n# Commande pour démarrer l'application\nCMD ["java", "-jar", "myapp.jar"]\n`;
        default:
            return '';
    }
};

export const generateDockerfile = async (language, database) => {
    const envAnswers = await askEnvVariables(database);
    let content = getDockerfileContent(language);
    
    // Ajouter des variables d'environnement pour la base de données
    content += `\n# Variables d'environnement pour ${database}\nENV DB_HOST=${envAnswers.db_host}\nENV DB_USER=${envAnswers.db_user || 'root'}\nENV DB_PASS=${envAnswers.db_pass || 'password'}\nENV DB_NAME=${envAnswers.db_name || 'my_database'}\n`;

    writeFileSync('Dockerfile', content);
    console.log('Fichier Dockerfile créé avec succès.');
};
