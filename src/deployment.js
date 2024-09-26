// src/deployment.js
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// Fonction pour générer le fichier CI/CD
export const generateCIConfig = () => {
    const content = `name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install
      - run: npm test
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: \${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: 'your-app-name'
          heroku_email: 'your-email@example.com'
`;

    // Créer le répertoire si nécessaire
    const dir = join(process.cwd(), '.github', 'workflows');
    mkdirSync(dir, { recursive: true });

    // Écrire le fichier
    writeFileSync(join(dir, 'ci-cd.yml'), content);
    console.log('Fichier de configuration CI/CD créé avec succès.');
};

// Fonction pour générer le fichier Docker Compose
export const generateDockerCompose = () => {
    const content = `version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      DB_HOST: \${DB_HOST}
      DB_USER: \${DB_USER}
      DB_PASS: \${DB_PASS}
      DB_NAME: \${DB_NAME}
  db:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: \${DB_PASS}
      MYSQL_DATABASE: \${DB_NAME}
`;

    const dir = join(process.cwd(), 'docker');
    mkdirSync(dir, { recursive: true });

    writeFileSync(join(dir, 'docker-compose.yml'), content);
    console.log('Fichier Docker Compose créé avec succès.');
};

// Fonction pour générer un fichier README avec les instructions de déploiement
export const generateDeploymentReadme = () => {
    const content = `# Instructions de Déploiement

## Déploiement via CI/CD
1. Créez un repository sur GitHub.
2. Ajoutez votre clé API Heroku dans les secrets du repository avec le nom HEROKU_API_KEY.
3. Modifiez le fichier .github/workflows/ci-cd.yml pour inclure le nom de votre application et votre email.
4. Poussez vos changements vers la branche principale pour déclencher le pipeline CI/CD.

## Déploiement Local avec Docker
1. Assurez-vous d'avoir Docker installé sur votre machine.
2. Exécutez la commande suivante dans le répertoire du projet:
   \`\`\`
   docker-compose up --build
   \`\`\`
3. Accédez à votre application sur http://localhost:3000.
`;

    writeFileSync('DEPLOYMENT.md', content);
    console.log('Fichier README de déploiement créé avec succès.');
};

// Fonction pour générer le fichier Procfile pour Heroku
export const generateProcfile = (language) => {
    let content;

    switch (language) {
        case 'Node.js':
            content = 'web: npm start\n';  // Commande pour démarrer une app Node.js
            break;
        case 'Python':
            content = 'web: python app.py\n';  // Commande pour démarrer une app Python
            break;
        case 'PHP':
            content = 'web: heroku-php-apache2\n';  // Commande pour démarrer une app PHP
            break;
        case 'Go':
            content = 'web: ./main\n';  // Commande pour démarrer une app Go compilée
            break;
        default:
            console.log('Langage non supporté pour Heroku');
            return;
    }

    // Écrire le contenu dans le fichier Procfile
    writeFileSync('Procfile', content);
    console.log('Fichier Procfile créé avec succès.');
};
