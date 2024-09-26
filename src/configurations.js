export const configurations = {
    "Node.js": {
        version: "18.x",
        packageManager: "npm",
        envFile: true,
        dockerFile: true,
        readme: true,
        ciCD: true
    },
    "Python": {
        version: "3.9",
        packageManager: "pip",
        envFile: true,
        dockerFile: true,
        readme: true,
        ciCD: true
    },
    "PHP": {
        version: "8.0",
        packageManager: "composer",
        envFile: true,
        dockerFile: true,
        readme: true,
        ciCD: true
    },
    "Go": {
        version: "1.17",
        packageManager: "go get",
        envFile: false,
        dockerFile: true,
        readme: true,
        ciCD: false
    },
    "Ruby": {
        version: "3.0",
        packageManager: "bundler",
        envFile: true,
        dockerFile: true,
        readme: true,
        ciCD: true
    },
    "Java": {
        version: "17", // Dernière version LTS stable
        packageManager: "maven",
        envFile: true,
        dockerFile: true,
        readme: true,
        ciCD: true
    },
    // Ajoutez d'autres langages ici
};

// Fonction pour récupérer la configuration d'un langage
export const getConfiguration = (language) => {
    return configurations[language];
};
