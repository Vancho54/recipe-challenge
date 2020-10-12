# API build with Apollo, GraphQL, TypeORM and with a Postgree DB

## Installation
Steps to run this project:

1. Clone the repository
```
$ git clone https://github.com/Vancho54/recipe-challenge
```

2. Install the dependencies typing `npm i` in the cloned folder
```
$ npm i
```

3. Setup database settings inside `ormconfig.json` file
```
"type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "user",
   "password": "user",
   "database": "postgres",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ]
```

4. Run `npm start` command
```
$ npm start
```

# Puzzle NodeJS Challenge by Iván Alejandro Palacios
