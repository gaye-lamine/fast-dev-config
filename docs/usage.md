
```md
# Utilisation de fast-dev-config

**fast-dev-config** est un outil CLI conçu pour générer rapidement des fichiers de configuration pour divers environnements de développement. Il prend en charge plusieurs langages de programmation et offre des options de déploiement flexibles.

## Prérequis

Assurez-vous que vous avez installé les éléments suivants :
- **Node.js** (version 14 ou plus récente)
- **npm** (ou **yarn**)
- **Git**

## Lancer l'outil

Pour démarrer l'outil, exécutez la commande suivante dans votre terminal :

```bash
node src/index.js
```

Suivez les instructions dans le CLI pour générer vos fichiers de configuration.

---

## Générer des fichiers `.env`

Le fichier `.env` est utilisé pour stocker les variables d'environnement nécessaires à votre projet. Voici comment le générer :

1. Exécutez la commande :
   ```bash
   node src/index.js
   ```

2. Répondez aux questions :
   ```
   ? Sélectionnez votre langage de programmation : Node.js
   ? Sélectionnez votre base de données : MySQL
   ? Entrez l'hôte de la base de données (par défaut : db) : db
   ? Entrez le nom d'utilisateur de la base de données (par défaut : root) : root
   ? Entrez le mot de passe de la base de données (par défaut : password) : password
   ```

3. Une fois terminé, un fichier `.env` sera généré dans le répertoire racine de votre projet.

---

## Générer des fichiers `Dockerfile`

Le fichier `Dockerfile` est utilisé pour créer une image Docker de votre projet. Voici comment le générer :

1. Exécutez la commande :
   ```bash
   node src/index.js
   ```

2. Sélectionnez votre langage de programmation et votre base de données :
   ```
   ? Sélectionnez votre langage de programmation : Python
   ? Sélectionnez votre base de données : PostgreSQL
   ```

3. Un fichier `Dockerfile` sera généré dans le répertoire racine.

---

## Générer des fichiers de configuration Tailwind CSS

Si vous travaillez avec Tailwind CSS, vous pouvez générer un fichier de configuration en procédant comme suit :

1. Exécutez la commande :
   ```bash
   node src/index.js
   ```

2. Sélectionnez l'option pour utiliser Tailwind CSS :
   ```
   ? Voulez-vous utiliser Tailwind CSS ? (oui/non) : oui
   ```

3. Un fichier `tailwind.config.js` ainsi qu'un fichier `tailwind.css` seront générés.

---

## Options de déploiement

fast-dev-config supporte plusieurs méthodes de déploiement. Voici comment configurer les options de déploiement :

### Docker Compose

1. Exécutez la commande :
   ```bash
   node src/index.js
   ```

2. Sélectionnez `Docker Compose` comme option de déploiement :
   ```
   ? Sélectionnez une option de déploiement : Docker Compose
   ```

3. Un fichier `docker-compose.yml` sera généré.

### Heroku

1. Exécutez la commande :
   ```bash
   node src/index.js
   ```

2. Sélectionnez `Heroku` comme option de déploiement :
   ```
   ? Sélectionnez une option de déploiement : Heroku
   ```

3. Un fichier `Procfile` sera généré.

### AWS

1. Exécutez la commande :
   ```bash
   node src/index.js
   ```

2. Sélectionnez `AWS` comme option de déploiement :
   ```
   ? Sélectionnez une option de déploiement : AWS
   ```

3. Une configuration spécifique à AWS sera générée.

### CI/CD

1. Exécutez la commande :
   ```bash
   node src/index.js
   ```

2. Sélectionnez `CI/CD` comme option de déploiement :
   ```
   ? Sélectionnez une option de déploiement : CI/CD
   ```

3. Un fichier de configuration pour votre CI/CD sera généré (par exemple, un fichier `.gitlab-ci.yml` ou `.github/workflows.yml`).

---

## Exemples d'utilisation

Voici quelques exemples d'utilisation de fast-dev-config pour différents langages et bases de données.

### Exemple pour Node.js avec MySQL

```bash
node src/index.js
```
Sélectionnez :
- Langage : Node.js
- Base de données : MySQL
- Hôte : db
- Utilisateur : root
- Mot de passe : password

Le fichier `.env` généré sera similaire à :
```
LANGUAGE=Node.js
DATABASE=MySQL
DB_HOST=db
DB_USER=root
DB_PASS=password
DB_NAME=my_database
```

### Exemple pour Python avec PostgreSQL

```bash
node src/index.js
```
Sélectionnez :
- Langage : Python
- Base de données : PostgreSQL

Le fichier `Dockerfile` généré sera similaire à :
```Dockerfile
FROM python:3.8

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers requirements.txt
COPY requirements.txt ./

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste de l'application
COPY . .

# Exposer le port d'écoute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["python", "app.py"]
```

---

## Problèmes fréquents

### Problème : "Command not found"
Assurez-vous que Node.js et npm sont bien installés sur votre machine.

### Problème : "Permission denied"
Si vous rencontrez des problèmes de permissions lors de l'écriture de fichiers, essayez d'exécuter la commande avec `sudo` (sur les systèmes Unix) ou vérifiez les permissions de vos répertoires.

---

## Conclusion

fast-dev-config est un outil puissant pour générer rapidement des fichiers de configuration. Utilisez-le pour automatiser vos configurations de développement et gagner du temps dans la mise en place de nouveaux projets.
```
