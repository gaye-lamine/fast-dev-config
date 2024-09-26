import inquirer from "inquirer";
import { writeFileSync } from "fs";

export const askEnvVariables = async (database) => {
    const envQuestions = [
        {
            type: 'input',
            name: 'db_host',
            message: 'Entrez l\'hôte de la base de données (par défaut : db) :',
            default: 'db',
            validate: input => input ? true : 'L\'hôte ne peut pas être vide.'
        },
        {
            type: 'input',
            name: 'db_user',
            message: 'Entrez le nom d\'utilisateur de la base de données (par défaut : root) :',
            default: database === 'PostgreSQL' ? 'postgres' : 'root',
            validate: input => input ? true : 'Le nom d\'utilisateur ne peut pas être vide.'
        },
        {
            type: 'input',
            name: 'db_pass',
            message: 'Entrez le mot de passe de la base de données (par défaut : password) :',
            default: 'password',
            validate: input => input ? true : 'Le mot de passe ne peut pas être vide.'
        },
        {
            type: 'input',
            name: 'db_name',
            message: 'Entrez le nom de la base de données (par défaut : my_database) :',
            default: 'my_database',
            validate: input => input ? true : 'Le nom de la base de données ne peut pas être vide.'
        }
    ];
    return await inquirer.prompt(envQuestions);
};

export const generateEnvFile = async (language, database) => {
    const envAnswers = await askEnvVariables(database);
    
    // Inclure l'environnement sélectionné dans le fichier .env
    const content = `LANGUAGE=${language}\nDATABASE=${database}\nENVIRONMENT=${envAnswers.environment}\n` +
        Object.entries(envAnswers)
        .filter(([key]) => key !== 'environment')  // Exclure l'environnement des autres variables
        .map(([key, value]) => `${key.toUpperCase()}=${value}`)
        .join('\n') + '\n';
    
    writeFileSync('.env', content);
    console.log(`Fichier .env créé avec succès pour l'environnement ${envAnswers.environment}.`);
};

