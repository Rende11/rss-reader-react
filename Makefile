install:
	npm install

develop:
	npm start

build:
	npm run build
test:
	npm test

lint:
	npm run lint

lint-fix:
	npm run lint -- --fix

.PHONY: test, build
