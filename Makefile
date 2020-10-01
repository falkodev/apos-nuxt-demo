start: dev

stop:
	docker-compose stop

kill:
	docker-compose kill

build:
	NODE_ENV=development docker-compose build

rebuild:
	NODE_ENV=development docker-compose build --no-cache

dev:
	make kill && NODE_ENV=development docker-compose up -d && make logs

prod:
	NODE_ENV=production docker-compose -f docker-compose.remote.yml up -d --build

logs-back:
	docker logs demo-backend -f

logs-front:
	docker logs demo-frontend -f

logs:
	make logs-back & make logs-front
