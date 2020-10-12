import { gql } from 'apollo-server-express';

export const recipeTypeDefs = gql `
    extend type Query {
        recipe(id: ID!): Recipe
        recipes(cursor: Int, limit: Int, input: filterRecipeInput): RecipeFeed
        getMyRecipes(cursor: Int, limit: Int): RecipeFeed
    }

    type RecipeFeed {
        recipeFeed: [Recipe!]
        pageInfo: PageInfo!
    }

    type Recipe {
        id: ID!
        name: String!
        description: String!
        ingredients: [String!]
        category: Category!
        user: UserInfo
    }

    type UserInfo {
        id: ID!
        name: String!
    }
    
    input createRecipeInput {
        name: String!
        description: String!
        ingredients: [String!]
    }
    
    input updateRecipeInput {
        name: String
        description: String
        ingredients: [String]
    }
    
    input filterRecipeInput {
        filterby: RecipeFilterBy!
        searchText: String
    }
    
    enum RecipeFilterBy {
        all
        category
        ingredients
        description
        name
    }

    extend type Mutation {
        createRecipe(categoryId: ID!, input: createRecipeInput!): Recipe
        deleteRecipe(id: ID!): Boolean
        updateRecipe(id:ID!, input: updateRecipeInput): Recipe
    }
`