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
signUp (input: {
   name: String
   email: Email
   password: between 7 - 15 characters
})
Login (input: {
   email: Email
   password: between 7 - 15 characters 
})
createCategory (input: {
   name: String
})
createRecipe (input: {
   name: String
   description: String
   ingrendients: Array of String
   categoryId: Int
})
recipes (filterby: {enum: {
   all
   name
   description
   ingredients
}} searchText: String)
categories (filterby: {enum: {
   all
   name
}} searchText: String)
category (id: Int)
recipe (id: Int)
updateRecipe (id: Int input: {
   name: String
   ingredients: Array of String
   description: String
})
updateCategory (id: Int input: {
   name: String
})
```

Remember, to create a recipe you must assign it to a category.

## Login

To try the mutation and queries you must be logged in, to do that create a user with the mutation signUp and Login with the mutation Login and copy paste de token in HTTP Headers:

```
"Authorization": "Bearer: (copy the token here)"
```


# Puzzle NodeJS Challenge by Iván Alejandro Palacios
