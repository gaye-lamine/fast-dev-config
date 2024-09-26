// src/index.js
import { questions } from "./questions.js";
import { generateEnvFile } from "./env.js";
import { generateDockerfile } from "./docker.js";
import { generateReadme } from "./readme.js";
import { generateTailwindConfig, generateTailwindCSSFile } from "./tailwind.js";
import {
    generateDockerCompose,
    generateCIConfig,
    generateProcfile,
    generateDeploymentReadme
} from "./deployment.js";
import { getConfiguration } from "./configurations.js"; // Importation de la configuration
import inquirer from "inquirer";

inquirer.prompt(questions).then(async answers => {
    console.log(`Vous avez choisi ${answers.language} avec la base de données ${answers.database} dans l'environnement ${answers.environment}`);

    // Récupération de la configuration pour le langage choisi
    const config = getConfiguration(answers.language);

    // Appel dynamique de la fonction en fonction du type de fichier choisi
    switch (answers.fileType) {
        case '.env':
            await generateEnvFile(answers.language, answers.database, answers.environment); // On passe l'environnement
            break;
        case 'Dockerfile':
            await generateDockerfile(answers.language, answers.database, answers.environment); // On passe l'environnement
            break;
        case 'README.md':
            generateReadme(answers.language, answers.environment); // On passe l'environnement
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
            generateProcfile(answers.language);
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

    // Utilisez la configuration pour d'autres tâches, si nécessaire
    console.log(`Configuration pour ${answers.language}:`, config);
});
