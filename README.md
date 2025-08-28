# fast-dev-config

Un outil CLI puissant pour configurer rapidement des environnements de développement en générant des fichiers `.env`, `Dockerfile`, et d'autres configurations pour plusieurs langages et bases de données.

## 🚀 Fonctionnalités

### Support Multi-langage
- **Node.js** (Express, NestJS, Fastify, Koa)
- **Python** (Django, Flask, FastAPI)
- **PHP** (Laravel, Symfony, CodeIgniter)
- **Java** (Spring Boot, Quarkus, Micronaut)
- **Go** (Gin, Echo, Fiber)
- **Ruby** (Rails, Sinatra)

### Bases de données supportées
- MySQL
- PostgreSQL
- MongoDB
- Redis
- SQLite
- Firebase

### Fonctionnalités avancées
- **Templates personnalisés** : Sauvegardez et réutilisez vos configurations
- **Configuration complète** : Génération de tous les fichiers en une fois
- **Docker Compose intelligent** : Services multiples selon vos besoins
- **Validation de compatibilité** : Alertes pour les configurations incompatibles
- **Messages colorés** : Interface utilisateur améliorée
- **CI/CD intégré** : GitHub Actions, GitLab CI

## 📦 Installation

### Prérequis
- Node.js (version 14 ou plus récente)
- npm ou yarn
- Git

### Installation locale
```bash
git clone https://github.com/gaye-lamine/fast-dev-config.git
cd fast-dev-config
npm install
```

## 🎯 Utilisation

### Démarrage rapide
```bash
npm start
```

### Options de configuration
L'outil vous guidera à travers un menu interactif pour :

1. **Choisir un template** existant ou créer une nouvelle configuration
2. **Sélectionner votre stack** : langage, framework, base de données
3. **Générer les fichiers** : `.env`, `Dockerfile`, `README.md`, ou configuration complète
4. **Configurer le déploiement** : Docker Compose, Heroku, AWS, CI/CD
5. **Sauvegarder comme template** pour une réutilisation future

### Exemples de configurations générées

#### Fichier .env
```env
# Configuration Développement
NODE_ENV=development
PORT=3000

# Framework: Express
EXPRESS_SESSION_SECRET=your-session-secret

# Base de données: PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=my_database

# Sécurité
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
API_KEY=your-api-key
```

#### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
      - PORT=3000
      - DB_HOST=postgres
    depends_on:
      - postgres
    networks:
      - app-network

  postgres:
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

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
```

## 🎨 Fonctionnalités avancées

### Système de templates
- Sauvegardez vos configurations favorites
- Réutilisez instantanément des setups complexes
- Partagez des templates avec votre équipe

### Intelligence contextuelle
- Détection automatique des incompatibilités
- Suggestions de variables d'environnement
- Configuration adaptée au framework choisi

### Docker Compose intelligent
- Services multiples (DB, Redis, etc.)
- Configuration réseau optimisée
- Volumes persistants

## 🛠️ Développement

### Structure du projet
```
fast-dev-config/
├── src/
│   ├── index.js          # Point d'entrée principal
│   ├── questions.js      # Configuration des prompts
│   ├── env.js           # Génération des fichiers .env
│   ├── docker.js        # Génération des Dockerfiles
│   ├── deployment.js    # Configurations de déploiement
│   ├── readme.js        # Génération des README
│   ├── templates.js     # Gestion des templates
│   └── utils.js         # Utilitaires et validation
├── package.json
└── README.md
```

### Contribuer
1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

### Ajouter un nouveau langage
1. Modifiez `src/questions.js` pour ajouter le langage
2. Ajoutez la configuration Docker dans `src/docker.js`
3. Mettez à jour les utilitaires dans `src/utils.js`

## 📝 Changelog

### Version 2.0.0 (Actuelle)
- ✅ Support de 6 langages et leurs frameworks
- ✅ 6 bases de données supportées
- ✅ Système de templates
- ✅ Configuration complète en une fois
- ✅ Docker Compose intelligent
- ✅ Messages colorés et validation
- ✅ Suppression de Tailwind CSS (non pertinent)

### Version 1.0.0
- Support basique Node.js, Python, PHP
- Génération .env et Dockerfile
- Options de déploiement simples

## 📄 Licence

ISC License - voir le fichier LICENSE pour plus de détails.

## 👨‍💻 Auteur

**Lamine Gaye** - Développeur principal

---

⭐ N'hésitez pas à donner une étoile si ce projet vous aide !