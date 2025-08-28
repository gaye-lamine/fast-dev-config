# Fast Dev Config - Interface Web

Interface web moderne pour générer rapidement des configurations d'environnement de développement.

## 🌟 Fonctionnalités

### Interface utilisateur intuitive
- **Design moderne** avec Tailwind CSS
- **Processus en 3 étapes** : Configuration → Génération → Téléchargement
- **Sélection visuelle** des bases de données et options
- **Feedback en temps réel** avec animations

### Génération intelligente
- **Support multi-langage** : Node.js, Python, PHP, Go, Ruby, Java
- **Frameworks populaires** : Express, NestJS, Django, Laravel, Spring Boot...
- **Bases de données variées** : MySQL, PostgreSQL, MongoDB, Redis, SQLite, Firebase
- **Fichiers de configuration** : .env, Dockerfile, README.md, docker-compose.yml
- **CI/CD intégré** : GitHub Actions

### Téléchargement instantané
- **Archive ZIP** avec tous les fichiers générés
- **Structure de projet** complète et prête à l'emploi
- **Dependencies automatiques** selon la stack choisie

## 🚀 Démarrage rapide

### Installation
```bash
# Depuis le dossier racine du projet
npm install
```

### Lancement du serveur web
```bash
npm run web
```

L'interface sera disponible sur `http://localhost:3000`

## 📱 Utilisation

### Étape 1 : Configuration
1. **Nom du projet** : Choisissez un nom pour votre projet
2. **Langage** : Sélectionnez votre langage de programmation
3. **Framework** : Choisissez un framework (optionnel)
4. **Base de données** : Sélection visuelle parmi 7 options
5. **Fichiers** : Cochez les fichiers à générer
6. **Déploiement** : Options de déploiement disponibles

### Étape 2 : Génération
- **Progression visuelle** de la génération des fichiers
- **Validation automatique** des configurations
- **Messages d'état** en temps réel

### Étape 3 : Téléchargement
- **Aperçu des fichiers** générés
- **Téléchargement ZIP** instantané
- **Option de nouvelle configuration**

## 🎨 Fonctionnalités avancées

### Validation intelligente
- **Détection d'incompatibilités** entre langages et bases de données
- **Suggestions automatiques** de configurations optimales
- **Alertes visuelles** pour les problèmes potentiels

### Génération contextuelle
- **Variables d'environnement** adaptées au framework
- **Dépendances automatiques** dans package.json
- **Configuration Docker** optimisée par langage
- **Scripts de démarrage** personnalisés

### Interface responsive
- **Design adaptatif** pour mobile et desktop
- **Animations fluides** et feedback utilisateur
- **Mode sombre** automatique selon les préférences système

## 🛠️ Architecture technique

### Frontend
- **HTML5** sémantique
- **Tailwind CSS** pour le styling
- **JavaScript ES6+** vanilla
- **Font Awesome** pour les icônes
- **JSZip** pour la génération d'archives

### Backend (optionnel)
- **Express.js** pour servir les fichiers statiques
- **API REST** pour la gestion des templates (futur)

### Structure des fichiers
```
web/
├── index.html          # Interface principale
├── app.js             # Logique JavaScript
├── style.css          # Styles personnalisés
├── server.js          # Serveur Express
└── README.md          # Documentation
```

## 🔧 Personnalisation

### Ajouter un nouveau langage
1. Modifier `frameworksByLanguage` dans `app.js`
2. Ajouter les configurations Docker dans `ConfigGenerator`
3. Mettre à jour les commandes d'installation et de démarrage

### Ajouter une nouvelle base de données
1. Ajouter l'option dans le HTML
2. Implémenter la génération des variables d'environnement
3. Ajouter la configuration Docker Compose

### Personnaliser le style
- Modifier `style.css` pour les styles personnalisés
- Utiliser les classes Tailwind pour les modifications rapides
- Ajouter des animations CSS personnalisées

## 📊 Exemples de configurations générées

### Stack Node.js + Express + PostgreSQL
```
mon-projet/
├── .env                    # Variables d'environnement
├── Dockerfile             # Configuration Docker
├── docker-compose.yml     # Services multiples
├── package.json           # Dépendances Node.js
├── README.md              # Documentation
└── .github/
    └── workflows/
        └── ci.yml         # CI/CD GitHub Actions
```

### Stack Python + Django + MySQL
```
mon-projet/
├── .env                   # Configuration Django
├── Dockerfile            # Python + Django
├── requirements.txt      # Dépendances Python
├── README.md             # Documentation
└── docker-compose.yml    # MySQL + Redis
```

## 🚀 Déploiement

### Hébergement statique
L'interface peut être hébergée sur :
- **Netlify** : Déploiement automatique depuis Git
- **Vercel** : Optimisé pour les applications frontend
- **GitHub Pages** : Hébergement gratuit
- **AWS S3** : Avec CloudFront pour la CDN

### Serveur Express
Pour un déploiement avec serveur :
```bash
# Production
NODE_ENV=production npm run web
```

## 🤝 Contribution

### Développement local
```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run web

# Ouvrir http://localhost:3000
```

### Améliorations suggérées
- [ ] Sauvegarde des templates côté serveur
- [ ] Authentification utilisateur
- [ ] Partage de configurations
- [ ] Prévisualisation des fichiers générés
- [ ] Support de plus de langages
- [ ] Intégration avec des APIs externes

## 📄 Licence

ISC License - Même licence que le projet principal

---

🌐 **Interface web moderne pour Fast Dev Config**
Générez vos environnements de développement en quelques clics !