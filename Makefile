ENV_VARS = \
	DB_URL=postgres://localhost:5432/cookbook_test \
	NODE_ENV=test


test: $(ENV_VARS) mocha --require co-mocha test

.PHONY: test