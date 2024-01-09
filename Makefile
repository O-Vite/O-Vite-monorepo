start:
	docker-compose up -d
	@echo "Attente du démarrage de PostgreSQL..."
	@while ! docker-compose exec postgres pg_isready -q; do \
		echo "En attente de PostgreSQL..."; \
		sleep 1; \
	done
	@echo "PostgreSQL est prêt."

	@echo "Installation des dépendances pour NestJS..."
	docker-compose exec nestjs npm install -f
	@echo "NestJS est en cours de démarrage..."

	@echo "Installation des dépendances pour React..."
	docker-compose exec react npm install -f
	@echo "React est en cours de démarrage..."
	docker-compose exec react npm run start


down:
	docker-compose down