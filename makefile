.PHONY: build
build:
	pushd dapr-components && make build && popd
	pushd python-app      && make build && popd

.PHONY: up
up:
	pushd dapr-components && make up && popd
	pushd python-app      && make up && popd

.PHONY: down
down:
	pushd dapr-components && make down && popd
	pushd python-app      && make down && popd

.PHONY: clean
clean:
	pushd dapr-components && make clean && popd
	pushd python-app      && make clean && popd
