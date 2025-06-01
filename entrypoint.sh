#!/bin/sh

./wait-for-it.sh db:5432 --timeout=30 --strict -- echo "Database is up"
yarn run migration:run:prod

node dist/main.js
