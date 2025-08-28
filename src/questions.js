import inquirer from "inquirer";

export const questions = [
    {
        type: 'list',
        name: 'useTemplate',
        message: 'Voulez-vous utiliser un template existant ?',
        choices: ['Non, nouvelle configuration', 'Oui, charger un template', 'Gérer les templates'],
        default: 'Non, nouvelle configuration'
    },
    {
        type: 'list',
        name: 'language',
        message: 'Choisissez votre langage de programmation :',
        choices: ['Node.js', 'Python', 'PHP', 'Go', 'Ruby', 'Java'],
        when: (answers) => answers.useTemplate === 'Non, nouvelle configuration'
    },
    {
        type: 'list',
        name: 'database',
        message: 'Choisissez votre base de données :',
        choices: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase', 'Aucune'],
        when: (answers) => answers.useTemplate === 'Non, nouvelle configuration'
    },
    {
        type: 'list',
        name: 'framework',
        message: 'Choisissez votre framework (optionnel) :',
        choices: (answers) => {
            switch (answers.language) {
                case 'Node.js':
                    return ['Express', 'NestJS', 'Fastify', 'Koa', 'Aucun'];
                case 'Python':
                    return ['Django', 'Flask', 'FastAPI', 'Aucun'];
                case 'PHP':
                    return ['Laravel', 'Symfony', 'CodeIgniter', 'Aucun'];
                case 'Java':
                    return ['Spring Boot', 'Quarkus', 'Micronaut', 'Aucun'];
                case 'Go':
                    return ['Gin', 'Echo', 'Fiber', 'Aucun'];
                case 'Ruby':
                    return ['Rails', 'Sinatra', 'Aucun'];
                default:
                    return ['Aucun'];
            }
        },
        when: (answers) => answers.useTemplate === 'Non, nouvelle configuration'
    },
    {
        type: 'list',
        name: 'fileType',
        message: 'Quel type de fichier voulez-vous générer ?',
        choices: ['.env', 'Dockerfile', 'README.md', 'Configuration complète'],
        when: (answers) => answers.useTemplate === 'Non, nouvelle configuration'
    },
    {
        type: 'list',
        name: 'deploymentOption',
        message: 'Choisissez votre option de déploiement :',
        choices: ['Docker Compose', 'Heroku', 'AWS', 'CI/CD', 'Aucune'],
        when: (answers) => answers.fileType !== '.env' && answers.useTemplate === 'Non, nouvelle configuration'
    },
    {
        type: 'confirm',
        name: 'saveAsTemplate',
        message: 'Voulez-vous sauvegarder cette configuration comme template ?',
        default: false,
        when: (answers) => answers.useTemplate === 'Non, nouvelle configuration'
    },
    {
        type: 'input',
        name: 'templateName',
        message: 'Nom du template :',
        validate: input => input ? true : 'Le nom du template est requis',
        when: (answers) => answers.saveAsTemplate
    }
];
