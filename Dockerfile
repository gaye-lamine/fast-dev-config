FROM python:3.8

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers requirements.txt
COPY requirements.txt ./

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Installer le client MySQL ou PostgreSQL
RUN apt-get update && apt-get install -y default-mysql-client libpq-dev

# Copier le reste de l'application
COPY . .

# Exposer le port d'écoute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["python", "app.py"]

# Variables d'environnement pour PostgreSQL
ENV DB_HOST=db
ENV DB_USER=postgres
ENV DB_PASS=password
ENV DB_NAME=my_database
