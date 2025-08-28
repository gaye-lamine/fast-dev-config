import { writeFileSync } from "fs";

import { log } from "./utils.js";

export const generateReadme = (language, framework = 'Aucun') => {
    const frameworkText = framework !== 'Aucun' ? ` avec ${framework}` : '';
    
    const content = `# Projet ${language}${frameworkText}

## Description
Ce projet a été généré automatiquement avec fast-dev-config.

## Prérequis
${getPrerequisites(language, framework)}

## Installation
\`\`\`bash
# Cloner le projet
git clone <votre-repo>
cd <nom-du-projet>

# Installer les dépendances
${getInstallCommand(language, framework)}
\`\`\`

## Configuration
1. Copiez le fichier \`.env.example\` vers \`.env\`
2. Modifiez les variables d'environnement selon vos besoins

## Démarrage
\`\`\`bash
${getStartCommand(language, framework)}
\`\`\`

## Structure du projet
${getProjectStructure(language, framework)}

## Scripts disponibles
${getAvailableScripts(language, framework)}

## Déploiement
Consultez le fichier \`DEPLOYMENT.md\` pour les instructions de déploiement.

## Contribution
1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request
`;

    writeFileSync('README.md', content);
    log.success('Fichier README.md créé avec succès');
};

const getPrerequisites = (language, framework) => {
    switch (language) {
        case 'Node.js':
            return '- Node.js (version 14 ou plus récente)\n- npm ou yarn';
        case 'Python':
            return '- Python 3.8+\n- pip';
        case 'PHP':
            return '- PHP 7.4+\n- Composer';
        case 'Java':
            return '- Java 11+\n- Maven ou Gradle';
        case 'Go':
            return '- Go 1.17+';
        case 'Ruby':
            return '- Ruby 3.0+\n- Bundler';
        default:
            return '- Voir la documentation du langage';
    }
};

const getInstallCommand = (language, framework) => {
    switch (language) {
        case 'Node.js':
            return 'npm install';
        case 'Python':
            return 'pip install -r requirements.txt';
        case 'PHP':
            return 'composer install';
        case 'Java':
            return 'mvn install';
        case 'Go':
            return 'go mod download';
        case 'Ruby':
            return 'bundle install';
        default:
            return '# Voir la documentation du langage';
    }
};

const getStartCommand = (language, framework) => {
    switch (language) {
        case 'Node.js':
            if (framework === 'NestJS') return 'npm run start:dev';
            return 'npm start';
        case 'Python':
            if (framework === 'Django') return 'python manage.py runserver';
            if (framework === 'Flask') return 'python app.py';
            if (framework === 'FastAPI') return 'uvicorn main:app --reload';
            return 'python main.py';
        case 'PHP':
            if (framework === 'Laravel') return 'php artisan serve';
            return 'php -S localhost:8000';
        case 'Java':
            return 'mvn spring-boot:run';
        case 'Go':
            return 'go run main.go';
        case 'Ruby':
            if (framework === 'Rails') return 'rails server';
            return 'ruby app.rb';
        default:
            return '# Voir la documentation du framework';
    }
};

const getProjectStructure = (language, framework) => {
    return `\`\`\`
.
├── src/          # Code source
├── tests/        # Tests
├── .env          # Variables d'environnement
├── Dockerfile    # Configuration Docker
└── README.md     # Documentation
\`\`\``;
};

const getAvailableScripts = (language, framework) => {
    switch (language) {
        case 'Node.js':
            return `- \`npm start\` - Démarrer l'application
- \`npm test\` - Lancer les tests
- \`npm run dev\` - Mode développement`;
        case 'Python':
            return `- \`python app.py\` - Démarrer l'application
- \`pytest\` - Lancer les tests`;
        default:
            return '- Voir package.json ou la documentation du framework';
    }
};
