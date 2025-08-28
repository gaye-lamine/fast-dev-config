import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

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

    const dir = join(process.cwd(), '.github', 'workflows');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'ci-cd.yml'), content);
    console.log('Fichier de configuration CI/CD créé avec succès.');
};

export const generateDockerCompose = (language = 'Node.js', database = 'MySQL', framework = 'Aucun') => {
    const appPort = getAppPort(language, framework);
    
    let content = `version: '3.8'

services:
  app:
    build: .
    ports:
      - '${appPort}:${appPort}'
    environment:
      - NODE_ENV=development
      - PORT=${appPort}
`;

    if (database !== 'Aucune') {
        content += getDatabaseEnvForCompose(database);
        content += `    depends_on:
      - ${getDatabaseServiceName(database)}
`;
    }

    content += `    volumes:
      - .:/app
      - /app/node_modules
    networks:
      - app-network

`;

    if (database !== 'Aucune') {
        content += getDatabaseService(database);
    }

    if (framework === 'Express' || framework === 'NestJS') {
        content += `  redis:
    image: redis:alpine
    ports:
      - '6379:6379'
    networks:
      - app-network

`;
    }

    content += `networks:
  app-network:
    driver: bridge

volumes:
  ${getDatabaseServiceName(database)}_data:
`;

    writeFileSync('docker-compose.yml', content);
    console.log('Fichier Docker Compose créé avec succès.');
};

const getAppPort = (language, framework) => {
    const ports = {
        'Node.js': { 'Express': '3000', 'NestJS': '3000', 'default': '3000' },
        'Python': { 'Django': '8000', 'Flask': '5000', 'FastAPI': '8000', 'default': '8000' },
        'PHP': { 'default': '80' },
        'Java': { 'default': '8080' },
        'Go': { 'default': '8080' },
        'Ruby': { 'default': '3000' }
    };
    
    return ports[language]?.[framework] || ports[language]?.default || '3000';
};

const getDatabaseServiceName = (database) => {
    const names = {
        'MySQL': 'mysql',
        'PostgreSQL': 'postgres',
        'MongoDB': 'mongo',
        'Redis': 'redis'
    };
    return names[database] || 'db';
};

const getDatabaseEnvForCompose = (database) => {
    switch (database) {
        case 'MySQL':
            return `      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_USER=root
      - DB_PASS=password
      - DB_NAME=my_database
`;
        case 'PostgreSQL':
            return `      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USER=postgres
      - DB_PASS=password
      - DB_NAME=my_database
`;
        case 'MongoDB':
            return `      - MONGO_HOST=mongo
      - MONGO_PORT=27017
      - MONGO_DB=my_database
      - MONGO_URI=mongodb://mongo:27017/my_database
`;
        default:
            return '';
    }
};

const getDatabaseService = (database) => {
    switch (database) {
        case 'MySQL':
            return `  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: my_database
    ports:
      - '3306:3306'
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - app-network

`;
        case 'PostgreSQL':
            return `  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: my_database
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

`;
        case 'MongoDB':
            return `  mongo:
    image: mongo:5.0
    ports:
      - '27017:27017'
    volumes:
      - mongo_data:/data/db
    networks:
      - app-network

`;
        default:
            return '';
    }
};

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

export const generateAWSConfig = () => {
    const content = `# Configuration pour AWS

## Déployer sur AWS Elastic Beanstalk
1. Installez l'AWS CLI et configurez-le avec vos identifiants.
2. Créez un environnement Elastic Beanstalk pour votre application.
3. Exécutez la commande suivante pour déployer:
   \`\`\`
   eb deploy
   \`\`\`
`;

    const dir = join(process.cwd(), 'aws');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'AWS_DEPLOYMENT.md'), content);
    console.log('Fichier de configuration AWS créé avec succès.');
};
