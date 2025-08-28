import inquirer from "inquirer";
import { writeFileSync } from "fs";
import { log } from "./utils.js";

export const askEnvVariables = async (database) => {
    if (database === 'Aucune') {
        return {
            environment: 'Développement',
            port: '3000'
        };
    }

    const baseQuestions = [
        {
            type: 'list',
            name: 'environment',
            message: 'Sélectionnez l\'environnement :',
            choices: ['Développement', 'Test', 'Production'],
            default: 'Développement'
        },
        {
            type: 'input',
            name: 'port',
            message: 'Port de l\'application (par défaut : 3000) :',
            default: '3000'
        }
    ];

    const dbQuestions = getDatabaseQuestions(database);
    
    return await inquirer.prompt([...baseQuestions, ...dbQuestions]);
};

const getDatabaseQuestions = (database) => {
    const commonQuestions = [
        {
            type: 'input',
            name: 'db_host',
            message: 'Entrez l\'hôte de la base de données (par défaut : localhost) :',
            default: 'localhost'
        }
    ];

    switch (database) {
        case 'MySQL':
        case 'PostgreSQL':
            return [
                ...commonQuestions,
                {
                    type: 'input',
                    name: 'db_port',
                    message: `Port ${database} (par défaut : ${database === 'MySQL' ? '3306' : '5432'}) :`,
                    default: database === 'MySQL' ? '3306' : '5432'
                },
                {
                    type: 'input',
                    name: 'db_user',
                    message: 'Nom d\'utilisateur :',
                    default: database === 'PostgreSQL' ? 'postgres' : 'root'
                },
                {
                    type: 'input',
                    name: 'db_pass',
                    message: 'Mot de passe :',
                    default: 'password'
                },
                {
                    type: 'input',
                    name: 'db_name',
                    message: 'Nom de la base de données :',
                    default: 'my_database'
                }
            ];
        
        case 'MongoDB':
            return [
                ...commonQuestions,
                {
                    type: 'input',
                    name: 'db_port',
                    message: 'Port MongoDB (par défaut : 27017) :',
                    default: '27017'
                },
                {
                    type: 'input',
                    name: 'db_name',
                    message: 'Nom de la base de données :',
                    default: 'my_database'
                }
            ];
        
        case 'Redis':
            return [
                ...commonQuestions,
                {
                    type: 'input',
                    name: 'redis_port',
                    message: 'Port Redis (par défaut : 6379) :',
                    default: '6379'
                },
                {
                    type: 'input',
                    name: 'redis_pass',
                    message: 'Mot de passe Redis (optionnel) :',
                    default: ''
                }
            ];
        
        case 'Firebase':
            return [
                {
                    type: 'input',
                    name: 'firebase_project_id',
                    message: 'ID du projet Firebase :',
                    validate: input => input ? true : 'L\'ID du projet est requis.'
                },
                {
                    type: 'input',
                    name: 'firebase_api_key',
                    message: 'Clé API Firebase :',
                    validate: input => input ? true : 'La clé API est requise.'
                }
            ];
        
        case 'SQLite':
            return [
                {
                    type: 'input',
                    name: 'db_path',
                    message: 'Chemin du fichier SQLite (par défaut : ./database.sqlite) :',
                    default: './database.sqlite'
                }
            ];
        
        default:
            return [];
    }
};

export const generateEnvFile = async (language, database, framework = 'Aucun') => {
    const envAnswers = await askEnvVariables(database);
    
    let content = `# Configuration ${envAnswers.environment}\n`;
    content += `NODE_ENV=${envAnswers.environment.toLowerCase()}\n`;
    content += `PORT=${envAnswers.port}\n\n`;
    
    if (framework !== 'Aucun') {
        content += `# Framework: ${framework}\n`;
        content += getFrameworkEnvVars(language, framework);
    }
    
    if (database !== 'Aucune') {
        content += `\n# Base de données: ${database}\n`;
        content += getDatabaseEnvVars(database, envAnswers);
    }
    
    content += `\n# Sécurité\n`;
    content += `JWT_SECRET=your-super-secret-jwt-key-change-this-in-production\n`;
    content += `API_KEY=your-api-key\n`;
    
    writeFileSync('.env', content);
    log.success(`Fichier .env créé pour l'environnement ${envAnswers.environment}`);
};

const getFrameworkEnvVars = (language, framework) => {
    const frameworkVars = {
        'Node.js': {
            'Express': 'EXPRESS_SESSION_SECRET=your-session-secret\n',
            'NestJS': 'NEST_DEBUG=true\n',
            'Fastify': 'FASTIFY_LOG_LEVEL=info\n'
        },
        'Python': {
            'Django': 'DJANGO_SECRET_KEY=your-django-secret-key\nDJANGO_DEBUG=True\n',
            'Flask': 'FLASK_ENV=development\nFLASK_DEBUG=True\n',
            'FastAPI': 'FASTAPI_DEBUG=True\n'
        },
        'PHP': {
            'Laravel': 'APP_KEY=base64:your-laravel-app-key\nAPP_DEBUG=true\n'
        }
    };
    
    return frameworkVars[language]?.[framework] || '';
};

const getDatabaseEnvVars = (database, answers) => {
    switch (database) {
        case 'MySQL':
        case 'PostgreSQL':
            return `DB_HOST=${answers.db_host}\nDB_PORT=${answers.db_port}\nDB_USER=${answers.db_user}\nDB_PASS=${answers.db_pass}\nDB_NAME=${answers.db_name}\n`;
        
        case 'MongoDB':
            return `MONGO_HOST=${answers.db_host}\nMONGO_PORT=${answers.db_port}\nMONGO_DB=${answers.db_name}\nMONGO_URI=mongodb://${answers.db_host}:${answers.db_port}/${answers.db_name}\n`;
        
        case 'Redis':
            return `REDIS_HOST=${answers.db_host}\nREDIS_PORT=${answers.redis_port}\n${answers.redis_pass ? `REDIS_PASSWORD=${answers.redis_pass}\n` : ''}`;
        
        case 'Firebase':
            return `FIREBASE_PROJECT_ID=${answers.firebase_project_id}\nFIREBASE_API_KEY=${answers.firebase_api_key}\n`;
        
        case 'SQLite':
            return `SQLITE_PATH=${answers.db_path}\n`;
        
        default:
            return '';
    }
};

