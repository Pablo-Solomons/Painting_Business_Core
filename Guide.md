# Guide pratique pour lancer le projet

### Commande pour lancer le backend depuis la racine:
	`cd "Backend" && set -a && source ../.env && set +a && ./mvnw spring-boot:run
	
	**Ce que ça fait:**
		+ `cd "Backend"` se place dans le dossier Spring Boot.
		+ `set -a && source ../.env && set +a` charge les variables du fichier .env dans le terminal.
		+ `./mvnw spring-boot:run` démarre l’application Spring Boot.

