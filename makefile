.PHONY: build
build:
	pushd dapr-components && make build && popd
	pushd python          && make build && popd
	pushd node            && make build && popd
	pushd deno            && make build && popd
	pushd golang          && make build && popd

.PHONY: up
up:
	pushd dapr-components && make up && popd
	pushd python          && make up && popd
	pushd node            && make up && popd
	pushd deno            && make up && popd
	pushd golang          && make up && popd

.PHONY: down
down:
	pushd dapr-components && make down && popd
	pushd python          && make down && popd
	pushd node            && make down && popd
	pushd deno            && make down && popd
	pushd golang          && make down && popd

.PHONY: clean
clean:
	pushd dapr-components && make clean && popd
	pushd python          && make clean && popd
	pushd node            && make clean && popd
	pushd deno            && make clean && popd
	pushd golang          && make clean && popd
