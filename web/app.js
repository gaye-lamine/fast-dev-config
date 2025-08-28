
const frameworksByLanguage = {
    'Node.js': ['Express', 'NestJS', 'Fastify', 'Koa', 'Aucun'],
    'Python': ['Django', 'Flask', 'FastAPI', 'Aucun'],
    'PHP': ['Laravel', 'Symfony', 'CodeIgniter', 'Aucun'],
    'Java': ['Spring Boot', 'Quarkus', 'Micronaut', 'Aucun'],
    'Go': ['Gin', 'Echo', 'Fiber', 'Aucun'],
    'Ruby': ['Rails', 'Sinatra', 'Aucun']
};


class ConfigGenerator {
    constructor(config) {
        this.config = config;
    }

    generateEnvFile() {
        let content = `# Configuration ${this.config.projectName}\n`;
        content += `NODE_ENV=development\n`;
        content += `PORT=3000\n\n`;


        if (this.config.framework !== 'Aucun') {
            content += `# Framework: ${this.config.framework}\n`;
            content += this.getFrameworkEnvVars();
        }


        if (this.config.database !== 'Aucune') {
            content += `\n# Base de données: ${this.config.database}\n`;
            content += this.getDatabaseEnvVars();
        }


        content += `\n# Sécurité\n`;
        content += `JWT_SECRET=your-super-secret-jwt-key-change-this-in-production\n`;
        content += `API_KEY=your-api-key\n`;

        return content;
    }

    generateDockerfile() {
        const dockerConfigs = {
            'Node.js': `FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]`,

            'Python': `FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "app.py"]`,

            'PHP': `FROM php:8.0-apache

COPY . /var/www/html/

RUN docker-php-ext-install pdo pdo_mysql

EXPOSE 80`,

            'Go': `FROM golang:1.19-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]`,

            'Java': `FROM openjdk:11-jre-slim

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]`,

            'Ruby': `FROM ruby:3.0-alpine

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 3000

CMD ["ruby", "app.rb"]`
        };

        return dockerConfigs[this.config.language] || dockerConfigs['Node.js'];
    }

    generateReadme() {
        const frameworkText = this.config.framework !== 'Aucun' ? ` avec ${this.config.framework}` : '';
        
        return `# ${this.config.projectName}

## Description
Projet ${this.config.language}${frameworkText} généré avec Fast Dev Config.

## Prérequis
${this.getPrerequisites()}

## Installation
\`\`\`bash
# Cloner le projet
git clone <votre-repo>
cd ${this.config.projectName}

# Installer les dépendances
${this.getInstallCommand()}
\`\`\`

## Configuration
1. Copiez le fichier \`.env.example\` vers \`.env\`
2. Modifiez les variables d'environnement selon vos besoins

## Démarrage
\`\`\`bash
${this.getStartCommand()}
\`\`\`

## Base de données
${this.config.database !== 'Aucune' ? `Ce projet utilise ${this.config.database}.` : 'Aucune base de données configurée.'}

## Déploiement
${this.config.deployment !== 'Aucune' ? `Configuration pour ${this.config.deployment} incluse.` : 'Aucune configuration de déploiement.'}

## Contribution
1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request
`;
    }

    generateDockerCompose() {
        if (!this.config.files.includes('docker-compose')) return null;

        const appPort = this.getAppPort();
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


        if (this.config.database !== 'Aucune') {
            content += this.getDatabaseService();
            content += `    depends_on:
      - ${this.getDatabaseServiceName()}
`;
        }

        content += `    volumes:
      - .:/app
      - /app/node_modules
    networks:
      - app-network

`;

        if (this.config.database !== 'Aucune') {
            content += this.getDatabaseServiceConfig();
        }

        content += `networks:
  app-network:
    driver: bridge

volumes:
  ${this.getDatabaseServiceName()}_data:
`;

        return content;
    }

    generateCIConfig() {
        if (this.config.deployment !== 'CI/CD') return null;

        return `name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup ${this.config.language}
      ${this.getCISetupStep()}
    
    - name: Install dependencies
      run: ${this.getInstallCommand()}
    
    - name: Run tests
      run: ${this.getTestCommand()}
    
    - name: Build
      run: ${this.getBuildCommand()}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: echo "Deploy step here"
`;
    }


    getFrameworkEnvVars() {
        const frameworkVars = {
            'Express': 'EXPRESS_SESSION_SECRET=your-session-secret\n',
            'NestJS': 'NEST_DEBUG=true\n',
            'Django': 'DJANGO_SECRET_KEY=your-django-secret-key\nDJANGO_DEBUG=True\n',
            'Flask': 'FLASK_ENV=development\nFLASK_DEBUG=True\n',
            'Laravel': 'APP_KEY=base64:your-laravel-app-key\nAPP_DEBUG=true\n'
        };
        return frameworkVars[this.config.framework] || '';
    }

    getDatabaseEnvVars() {
        const dbVars = {
            'MySQL': 'DB_HOST=localhost\nDB_PORT=3306\nDB_USER=root\nDB_PASS=password\nDB_NAME=my_database\n',
            'PostgreSQL': 'DB_HOST=localhost\nDB_PORT=5432\nDB_USER=postgres\nDB_PASS=password\nDB_NAME=my_database\n',
            'MongoDB': 'MONGO_HOST=localhost\nMONGO_PORT=27017\nMONGO_DB=my_database\nMONGO_URI=mongodb://localhost:27017/my_database\n',
            'Redis': 'REDIS_HOST=localhost\nREDIS_PORT=6379\n',
            'Firebase': 'FIREBASE_PROJECT_ID=your-project-id\nFIREBASE_API_KEY=your-api-key\n',
            'SQLite': 'SQLITE_PATH=./database.sqlite\n'
        };
        return dbVars[this.config.database] || '';
    }

    getPrerequisites() {
        const prereqs = {
            'Node.js': '- Node.js (version 16 ou plus récente)\n- npm ou yarn',
            'Python': '- Python 3.9+\n- pip',
            'PHP': '- PHP 8.0+\n- Composer',
            'Java': '- Java 11+\n- Maven ou Gradle',
            'Go': '- Go 1.19+',
            'Ruby': '- Ruby 3.0+\n- Bundler'
        };
        return prereqs[this.config.language] || '';
    }

    getInstallCommand() {
        const commands = {
            'Node.js': 'npm install',
            'Python': 'pip install -r requirements.txt',
            'PHP': 'composer install',
            'Java': 'mvn install',
            'Go': 'go mod download',
            'Ruby': 'bundle install'
        };
        return commands[this.config.language] || 'npm install';
    }

    getStartCommand() {
        const commands = {
            'Node.js': this.config.framework === 'NestJS' ? 'npm run start:dev' : 'npm start',
            'Python': this.config.framework === 'Django' ? 'python manage.py runserver' : 'python app.py',
            'PHP': this.config.framework === 'Laravel' ? 'php artisan serve' : 'php -S localhost:8000',
            'Java': 'mvn spring-boot:run',
            'Go': 'go run main.go',
            'Ruby': this.config.framework === 'Rails' ? 'rails server' : 'ruby app.rb'
        };
        return commands[this.config.language] || 'npm start';
    }

    getAppPort() {
        const ports = {
            'Node.js': '3000',
            'Python': this.config.framework === 'Django' ? '8000' : '5000',
            'PHP': '80',
            'Java': '8080',
            'Go': '8080',
            'Ruby': '3000'
        };
        return ports[this.config.language] || '3000';
    }

    getDatabaseServiceName() {
        const names = {
            'MySQL': 'mysql',
            'PostgreSQL': 'postgres',
            'MongoDB': 'mongo',
            'Redis': 'redis'
        };
        return names[this.config.database] || 'db';
    }

    getDatabaseService() {
        if (this.config.database === 'Aucune') return '';
        
        return `      - DB_HOST=${this.getDatabaseServiceName()}
`;
    }

    getDatabaseServiceConfig() {
        const configs = {
            'MySQL': `  mysql:
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

`,
            'PostgreSQL': `  postgres:
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

`,
            'MongoDB': `  mongo:
    image: mongo:5.0
    ports:
      - '27017:27017'
    volumes:
      - mongo_data:/data/db
    networks:
      - app-network

`
        };
        return configs[this.config.database] || '';
    }

    getCISetupStep() {
        const steps = {
            'Node.js': 'uses: actions/setup-node@v3\n      with:\n        node-version: "16"',
            'Python': 'uses: actions/setup-python@v3\n      with:\n        python-version: "3.9"',
            'Java': 'uses: actions/setup-java@v3\n      with:\n        java-version: "11"',
            'Go': 'uses: actions/setup-go@v3\n      with:\n        go-version: "1.19"',
            'Ruby': 'uses: ruby/setup-ruby@v1\n      with:\n        ruby-version: "3.0"'
        };
        return steps[this.config.language] || steps['Node.js'];
    }

    getTestCommand() {
        const commands = {
            'Node.js': 'npm test',
            'Python': 'pytest',
            'PHP': 'vendor/bin/phpunit',
            'Java': 'mvn test',
            'Go': 'go test ./...',
            'Ruby': 'bundle exec rspec'
        };
        return commands[this.config.language] || 'npm test';
    }

    getBuildCommand() {
        const commands = {
            'Node.js': 'npm run build',
            'Python': 'echo "No build step"',
            'PHP': 'echo "No build step"',
            'Java': 'mvn package',
            'Go': 'go build',
            'Ruby': 'echo "No build step"'
        };
        return commands[this.config.language] || 'npm run build';
    }
}


class WebApp {
    constructor() {
        this.currentStep = 1;
        this.config = {};
        this.generatedFiles = {};
        this.configHistory = this.loadConfigHistory();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateFrameworkOptions();
        this.displayConfigHistory();
        this.setupFeedbackSystem();
    }

    setupEventListeners() {

        document.getElementById('language').addEventListener('change', () => {
            this.updateFrameworkOptions();
        });


        document.getElementById('config-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadProject();
        });

        document.getElementById('new-config-btn').addEventListener('click', () => {
            this.resetForm();
        });
    }

    updateFrameworkOptions() {
        const language = document.getElementById('language').value;
        const frameworkSelect = document.getElementById('framework');
        
        frameworkSelect.innerHTML = '<option value="Aucun">Aucun framework</option>';
        
        if (language && frameworksByLanguage[language]) {
            frameworksByLanguage[language].forEach(framework => {
                if (framework !== 'Aucun') {
                    const option = document.createElement('option');
                    option.value = framework;
                    option.textContent = framework;
                    frameworkSelect.appendChild(option);
                }
            });
        }
    }

    handleFormSubmit() {
        this.config = {
            projectName: document.getElementById('projectName').value,
            language: document.getElementById('language').value,
            framework: document.getElementById('framework').value,
            database: document.querySelector('input[name="database"]:checked')?.value || 'Aucune',
            deployment: document.getElementById('deployment').value,
            files: Array.from(document.querySelectorAll('input[name="files"]:checked')).map(cb => cb.value)
        };

        if (!this.config.projectName || !this.config.language) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        this.generateProject();
    }

    async generateProject() {
        this.showStep(2);
        
        const generator = new ConfigGenerator(this.config);
        const progressSteps = [
            { id: 'progress-env', file: 'env', generator: () => generator.generateEnvFile() },
            { id: 'progress-docker', file: 'dockerfile', generator: () => generator.generateDockerfile() },
            { id: 'progress-readme', file: 'readme', generator: () => generator.generateReadme() },
            { id: 'progress-complete', file: 'complete', generator: null }
        ];

        for (let i = 0; i < progressSteps.length; i++) {
            const step = progressSteps[i];
            
            this.activateProgressStep(step.id);
            
            await this.delay(800); 
            if (step.generator && this.config.files.includes(step.file)) {
                this.generatedFiles[step.file] = step.generator();
            }
            
            this.completeProgressStep(step.id);
        }

        if (this.config.files.includes('docker-compose')) {
            this.generatedFiles['docker-compose'] = generator.generateDockerCompose();
        }

        if (this.config.deployment === 'CI/CD') {
            this.generatedFiles['ci-config'] = generator.generateCIConfig();
        }

        await this.delay(500);
        this.showStep(3);
        this.displayGeneratedFiles();
    }

    activateProgressStep(stepId) {
        const step = document.getElementById(stepId);
        if (!step) return;
        
        step.classList.remove('opacity-50');
        const borderElement = step.querySelector('.border-gray-300') || step.querySelector('.border-2');
        if (borderElement) {
            borderElement.classList.remove('border-gray-300');
            borderElement.classList.add('border-blue-500', 'border-t-transparent', 'animate-spin');
        }
    }

    completeProgressStep(stepId) {
        const step = document.getElementById(stepId);
        if (!step) return;
        
        const spinner = step.querySelector('.animate-spin');
        if (spinner) {
            spinner.classList.remove('animate-spin', 'border-t-transparent', 'border-blue-500');
            spinner.classList.add('border-green-500');
            spinner.innerHTML = '<i class="fas fa-check text-green-500 text-xs"></i>';
        }
    }

    displayGeneratedFiles() {
        const container = document.getElementById('generated-files');
        container.innerHTML = '';

        const fileNames = {
            'env': '.env',
            'dockerfile': 'Dockerfile',
            'readme': 'README.md',
            'docker-compose': 'docker-compose.yml',
            'ci-config': '.github/workflows/ci.yml'
        };

        Object.keys(this.generatedFiles).forEach(fileType => {
            if (this.generatedFiles[fileType]) {
                const div = document.createElement('div');
                div.className = 'flex items-center space-x-2';
                div.innerHTML = `
                    <i class="fas fa-file-code text-blue-500"></i>
                    <span>${fileNames[fileType] || fileType}</span>
                `;
                container.appendChild(div);
            }
        });
    }

    downloadProject() {
        const zip = new JSZip();
        
        const fileNames = {
            'env': '.env',
            'dockerfile': 'Dockerfile',
            'readme': 'README.md',
            'docker-compose': 'docker-compose.yml',
            'ci-config': '.github/workflows/ci.yml'
        };

        Object.keys(this.generatedFiles).forEach(fileType => {
            if (this.generatedFiles[fileType]) {
                const fileName = fileNames[fileType] || fileType;
                if (fileName.includes('/')) {
                    const parts = fileName.split('/');
                    const folder = parts.slice(0, -1).join('/');
                    const file = parts[parts.length - 1];
                    zip.folder(folder).file(file, this.generatedFiles[fileType]);
                } else {
                    zip.file(fileName, this.generatedFiles[fileType]);
                }
            }
        });

        if (this.config.language === 'Node.js') {
            const packageJson = {
                name: this.config.projectName,
                version: "1.0.0",
                description: `Projet ${this.config.language} généré avec Fast Dev Config`,
                main: "index.js",
                scripts: {
                    start: "node index.js",
                    dev: "nodemon index.js",
                    test: "echo \"Error: no test specified\" && exit 1"
                },
                dependencies: this.getNodeDependencies(),
                devDependencies: {
                    nodemon: "^2.0.20"
                }
            };
            zip.file('package.json', JSON.stringify(packageJson, null, 2));
        }

        zip.generateAsync({ type: 'blob' }).then(content => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `${this.config.projectName}.zip`;
            link.click();
        });
    }

    getNodeDependencies() {
        const baseDeps = {};
        
        const frameworkDeps = {
            'Express': { express: '^4.18.2', cors: '^2.8.5', helmet: '^6.0.1' },
            'NestJS': { '@nestjs/core': '^9.0.0', '@nestjs/common': '^9.0.0', '@nestjs/platform-express': '^9.0.0' },
            'Fastify': { fastify: '^4.0.0', '@fastify/cors': '^8.0.0' },
            'Koa': { koa: '^2.14.1', 'koa-router': '^12.0.0', 'koa-cors': '^0.0.16' }
        };

        if (this.config.framework !== 'Aucun' && frameworkDeps[this.config.framework]) {
            Object.assign(baseDeps, frameworkDeps[this.config.framework]);
        }

        const dbDeps = {
            'MySQL': { mysql2: '^3.0.0' },
            'PostgreSQL': { pg: '^8.8.0' },
            'MongoDB': { mongoose: '^6.8.0' },
            'Redis': { redis: '^4.5.0' },
            'SQLite': { sqlite3: '^5.1.0' }
        };

        if (this.config.database !== 'Aucune' && dbDeps[this.config.database]) {
            Object.assign(baseDeps, dbDeps[this.config.database]);
        }

        Object.assign(baseDeps, {
            dotenv: '^16.0.3'
        });

        return baseDeps;
    }

    showStep(stepNumber) {
        document.getElementById('config-step').classList.add('hidden');
        document.getElementById('generation-step').classList.add('hidden');
        document.getElementById('download-step').classList.add('hidden');

        const steps = ['config-step', 'generation-step', 'download-step'];
        document.getElementById(steps[stepNumber - 1]).classList.remove('hidden');

        this.updateStepIndicators(stepNumber);
        this.currentStep = stepNumber;
    }

    updateStepIndicators(activeStep) {
        for (let i = 1; i <= 3; i++) {
            const stepElement = document.getElementById(`step-${i}`);
            stepElement.classList.remove('step-active', 'step-completed', 'bg-gray-200', 'text-gray-600');
            
            if (i < activeStep) {
                stepElement.classList.add('step-completed');
            } else if (i === activeStep) {
                stepElement.classList.add('step-active');
            } else {
                stepElement.classList.add('bg-gray-200', 'text-gray-600');
            }
        }
    }

    resetForm() {
        document.getElementById('config-form').reset();
        this.config = {};
        this.generatedFiles = {};
        this.showStep(1);
        this.updateFrameworkOptions();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WebApp();
});

if (typeof JSZip === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    document.head.appendChild(script);
}