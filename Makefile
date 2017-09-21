build:
	docker build -t maiktheknife/mehr_django .

up: build
	docker-compose up --remove-orphans -d

down:
	docker-compose down --remove-orphans

restart: down up

ps:
	docker-compose ps

logs:
	docker-compose logs
