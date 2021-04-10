DOCKER_COMPOSE:=docker-compose
DOCKER_COMPOSE_FILE:=docker-compose.yml
DOCKER_COMPOSE_DEV_FILE:=docker-compose.dev.yml

.PHONY: build
build:
	$(DOCKER_COMPOSE) build

.PHONY: up
up:
	$(DOCKER_COMPOSE) up -d --build

.PHONY: debug
debug:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) -f $(DOCKER_COMPOSE_DEV_FILE) up -d --build

.PHONY: down
down:
	$(DOCKER_COMPOSE) down --rmi all --volumes --remove-orphans
