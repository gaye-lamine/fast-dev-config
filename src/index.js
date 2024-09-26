// src/index.js
import { questions } from "./questions.js";
import { generateEnvFile } from "./env.js";
import { generateDockerfile } from "./docker.js";
import { generateReadme } from "./readme.js";
import { generateTailwindConfig, generateTailwindCSSFile } from "./tailwind.js";
import {
    generateDockerCompose,
    generateCIConfig,
    generateDeploymentReadme,
    generateAWSConfig // Assurez-vous que cette importation est correcte
} from "./deployment.js";
import inquirer from "inquirer";

inquirer.prompt(questions).then(async answers => {
    console.log(`Vous avez choisi ${answers.language} avec la base de données ${answers.database}`);

    // Appel dynamique de la fonction en fonction du type de fichier choisi
    switch (answers.fileType) {
        case '.env':
            await generateEnvFile(answers.language, answers.database);
            break;
        case 'Dockerfile':
            await generateDockerfile(answers.language, answers.database);
            break;
        case 'README.md':
            generateReadme(answers.language);
            break;
    }

    // Génération des fichiers Tailwind CSS si l'utilisateur a choisi cette option
    if (answers.useTailwind) {
        generateTailwindConfig();
        generateTailwindCSSFile();
    }

    // Gérer les options de déploiement
    switch (answers.deploymentOption) {
        case 'Docker Compose':
            generateDockerCompose();
            break;
        case 'Heroku':
            generateCIConfig(); // Cela doit générer le fichier CI/CD pour Heroku
            break;
        case 'AWS':
            generateAWSConfig();
            break;
        case 'CI/CD':
            generateCIConfig();
            break;
        case 'Aucune':
            console.log('Aucune option de déploiement sélectionnée.');
            break;
    }
});
