import inquirer from "inquirer";

export const questions = [
    {
        type: 'list',
        name: 'language',
        message: 'Choisissez votre langage de programmation :',
        choices: ['Node.js', 'Python', 'PHP', 'Go', 'Ruby', 'Java'] // Ajout de Java ici
    },
    {
        type: 'list',
        name: 'database',
        message: 'Choisissez votre base de données :',
        choices: ['MySQL', 'PostgreSQL', 'MongoDB']
    },
    {
        type: 'list',
        name: 'fileType',
        message: 'Quel type de fichier voulez-vous générer ?',
        choices: ['.env', 'Dockerfile', 'README.md']
    },
    {
        type: 'confirm',
        name: 'useTailwind',
        message: 'Voulez-vous ajouter Tailwind CSS ?',
        default: false
    },
    {
        type: 'list',
        name: 'deploymentOption',
        message: 'Choisissez votre option de déploiement :',
        choices: ['Docker Compose', 'Heroku', 'AWS', 'CI/CD', 'Aucune'],
        when: (answers) => answers.fileType !== '.env' 
    }
];
