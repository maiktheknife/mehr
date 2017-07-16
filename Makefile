up:
	docker build -t maiktheknife/mehr_django .
	docker-compose up --remove-orphans --abort-on-container-exit
	# docker-compose run -p 8000:8000 web bash

down:
	docker-compose down --remove-orphans

restart: down up

ps:
	docker-compose ps

logs:
	docker-compose logs
