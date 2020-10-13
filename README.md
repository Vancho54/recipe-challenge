# API build with Apollo, GraphQL, TypeORM and with a Postgree DB

## Information
This is a API CRUD (create, read, update, and delete), you can do that operation and populate a recipes Database

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
3. Create a Postgres DB and connect it with the project

4. Setup database settings inside `ormconfig.json` file that looks like this
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

5. Run `npm start` command
```
$ npm run begin
```

## Testing the queries
To test the queries follow the following instructions:

1. Enter to http://localhost:4000/graphql. You are in the playground now.

2. You can try queries and mutation, below you have a list of queries to try:

```
Sign Up
Login
Create category
Create recipe 
Get recipes
Get categories
Get one category
Get one recipe
Update recipe
Update category
```

Remember, to create a recipe you must assign it to a category.


# Puzzle NodeJS Challenge by Iván Alejandro Palacios
