import { writeFileSync } from "fs";

export const generateReadme = (language) => {
    const content = `# Projet utilisant ${language}\n\n## Instructions d'installation\n...\n`;
    writeFileSync('README.md', content);
    console.log('Fichier README.md créé avec succès.');
};
