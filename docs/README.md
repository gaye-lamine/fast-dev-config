# fast-dev-config

**fast-dev-config** est un outil CLI conçu pour configurer rapidement des environnements de développement en générant des fichiers `.env`, `Dockerfile`, et d'autres configurations pour plusieurs langages et bases de données.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Licence](https://img.shields.io/badge/licence-ISC-green)

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Contribution](#contribution)
- [CHANGELOG](#changelog)
- [Licence](#licence)

## Fonctionnalités

- **Génération automatique** des fichiers `.env`, `Dockerfile`, et fichiers de configuration Tailwind CSS.
- **Support multi-langage** : Node.js, Python, PHP, Go, Ruby, Java.
- **Options de déploiement** : Docker, Heroku, AWS, CI/CD.

## Installation

### Prérequis

Avant d'installer **fast-dev-config**, assurez-vous d'avoir installé :

- Node.js (version 14 ou plus récente)
- NPM (ou Yarn)
- Git

### Étapes d'installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/gaye-lamine/fast-dev-config.git
   cd fast-dev-config

   2. Installez les dépendances :
      ```bash
      npm install
      ```
   ```

3. **Continuer avec les sections suivantes :** Assurez-vous que les sections suivantes, comme "Utilisation", "Contribution", "CHANGELOG", et "Licence", suivent le même formatage.

Voici la suite de votre `README.md` avec des retours à la ligne et des blocs de code correctement formatés :

```markdown
## Utilisation

Pour utiliser **fast-dev-config** , exécutez la commande suivante dans votre terminal :

```bash
node src/index.js [options]
```

### Options disponibles

- `--lang <langage>` : Spécifiez le langage pour lequel générer la configuration (ex. : `node`, `python`, `php`, etc.).
- `--deploy <service>` : Spécifiez le service de déploiement (ex. : `docker`, `heroku`, etc.).

## Contribution

Merci de vouloir contribuer à **fast-dev-config** ! Voici comment vous pouvez le faire.

### Comment contribuer ?

1. **Forkez le projet** depuis GitHub.
   
2. **Clonez votre fork** sur votre machine :
   ```bash
   git clone https://github.com/votre-utilisateur/fast-dev-config.git
   cd fast-dev-config
   ```

3. **Créez une nouvelle branche** pour vos modifications :
   ```bash
   git checkout -b ma-branche
   ```

4. **Faites vos modifications** dans le code et ajoutez un message de commit descriptif :
   ```bash
   git add .
   git commit -m "Ajout d'une nouvelle fonctionnalité"
   ```

5. **Poussez vos modifications** vers votre fork :
   ```bash
   git push origin ma-branche
   ```

6. **Ouvrez une Pull Request** (PR) sur GitHub :
   - Allez sur la page GitHub de votre fork.
   - Cliquez sur le bouton "Compare & pull request".
   - Décrivez vos modifications et soumettez la PR.

### Lignes directrices

- **Testez vos modifications** avant de soumettre une PR pour éviter les régressions.
- Pour des modifications majeures, **discutez-en d'abord dans une issue**.

## CHANGELOG

### [1.0.0] - 2024-09-26
- Version initiale avec la génération de fichiers `.env`, `Dockerfile`, et fichiers de configuration pour plusieurs langages.

## Licence

Distribué sous la licence ISC. Voir le fichier `LICENSE` pour plus d'informations.
```




