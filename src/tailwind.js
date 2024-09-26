import { writeFileSync } from "fs";

export const generateTailwindConfig = () => {
    const content = `module.exports = {\n    purge: [],\n    darkMode: false, // or 'media' or 'class'\n    theme: {\n        extend: {},\n    },\n    variants: {\n        extend: {},\n    },\n    plugins: [],\n};`;
    writeFileSync('tailwind.config.js', content);
    console.log('Fichier tailwind.config.js créé avec succès.');
};

export const generateTailwindCSSFile = () => {
    const content = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
    writeFileSync('styles.css', content);
    console.log('Fichier styles.css créé avec succès.');
};
