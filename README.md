# cookbook-api

## Setup
  * `git clone`
  * `cp .env.sample .env`
  * `npm start`
  * Will be running on port 8080 by default

## Testing 
  Run `mocha --require co-mocha`

## TODO:
  * Add Ingredients table
  * Add Ingredient measurement types
  * Add Reviews / Comments / Ratings
  * Add Ping route
  * Add db setup / teardown every test cycle
  * Add makefile support for tests to run in different environment
  * Add Travis CI checks before merging
  * Add JS Lint check for testing
  * Add proper authentication flow (Oauth2)
  * Create fork of node-migrate to store the state in the database itself