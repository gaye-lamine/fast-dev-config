import { questions } from "./questions.js";
import { generateEnvFile } from "./env.js";
import { generateDockerfile } from "./docker.js";
import { generateReadme } from "./readme.js";
import { log, validateCompatibility } from "./utils.js";
import { saveTemplate, loadTemplate, listTemplates, deleteTemplate } from "./templates.js";
import {
    generateDockerCompose,
    generateCIConfig,
    generateDeploymentReadme,
    generateAWSConfig
} from "./deployment.js";
import inquirer from "inquirer";

inquirer.prompt(questions).then(async answers => {
    log.title('Configuration de votre environnement de développement');
    
    if (answers.useTemplate === 'Gérer les templates') {
        await manageTemplates();
        return;
    }
    
    if (answers.useTemplate === 'Oui, charger un template') {
        const templates = listTemplates();
        if (templates.length === 0) {
            log.warning('Aucun template disponible. Création d\'une nouvelle configuration.');
        } else {
            const templateChoice = await inquirer.prompt([{
                type: 'list',
                name: 'selectedTemplate',
                message: 'Choisissez un template :',
                choices: templates.map(t => t.name)
            }]);
            
            const templateConfig = loadTemplate(templateChoice.selectedTemplate);
            if (templateConfig) {
                Object.assign(answers, templateConfig);
            }
        }
    }
    
    const incompatibilities = validateCompatibility(answers.language, answers.database, answers.framework);
    if (incompatibilities.length > 0) {
        incompatibilities.forEach(warning => log.warning(warning));
    }
    
    log.info(`Langage: ${answers.language}${answers.framework !== 'Aucun' ? ` (${answers.framework})` : ''}`);
    log.info(`Base de données: ${answers.database}`);

    if (answers.fileType === 'Configuration complète') {
        await generateEnvFile(answers.language, answers.database, answers.framework);
        await generateDockerfile(answers.language, answers.database, answers.framework);
        generateReadme(answers.language, answers.framework);
        
        if (answers.deploymentOption && answers.deploymentOption !== 'Aucune') {
            await handleDeployment(answers);
        }
    } else {
        switch (answers.fileType) {
            case '.env':
                await generateEnvFile(answers.language, answers.database, answers.framework);
                break;
            case 'Dockerfile':
                await generateDockerfile(answers.language, answers.database, answers.framework);
                break;
            case 'README.md':
                generateReadme(answers.language, answers.framework);
                break;
        }

        if (answers.deploymentOption) {
            await handleDeployment(answers);
        }
    }
    
    if (answers.saveAsTemplate && answers.templateName) {
        const templateConfig = {
            language: answers.language,
            database: answers.database,
            framework: answers.framework,
            fileType: answers.fileType,
            deploymentOption: answers.deploymentOption
        };
        saveTemplate(answers.templateName, templateConfig);
    }
    
    log.success('Configuration terminée avec succès !');
});

const handleDeployment = async (answers) => {
    switch (answers.deploymentOption) {
        case 'Docker Compose':
            generateDockerCompose(answers.language, answers.database, answers.framework);
            break;
        case 'Heroku':
            generateCIConfig(answers.language, answers.framework);
            break;
        case 'AWS':
            generateAWSConfig();
            break;
        case 'CI/CD':
            generateCIConfig(answers.language, answers.framework);
            break;
        case 'Aucune':
            log.info('Aucune option de déploiement sélectionnée.');
            break;
    }
};

const manageTemplates = async () => {
    const templates = listTemplates();
    
    if (templates.length === 0) {
        log.info('Aucun template sauvegardé');
        return;
    }
    
    const action = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Que voulez-vous faire ?',
        choices: ['Lister les templates', 'Supprimer un template', 'Retour']
    }]);
    
    switch (action.action) {
        case 'Lister les templates':
            log.info('Templates disponibles :');
            templates.forEach(t => {
                console.log(`  - ${t.name} (créé le ${new Date(t.created).toLocaleDateString()})`);
            });
            break;
            
        case 'Supprimer un template':
            const templateToDelete = await inquirer.prompt([{
                type: 'list',
                name: 'template',
                message: 'Template à supprimer :',
                choices: templates.map(t => t.name)
            }]);
            deleteTemplate(templateToDelete.template);
            break;
    }
};
