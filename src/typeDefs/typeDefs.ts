import { gql } from 'apollo-server-express';
import { userTypeDefs } from './user'
import { recipeTypeDefs } from './recipe'
import { categoryTypeDefs } from './category'


export const baseTypeDefs = gql `
    
    scalar EmailAddress

    scalar NonEmptyString

    scalar Password

    type Query {
        _: String
    }

    type PageInfo {
        nextPageCursor: String
        hasNextPage: Boolean
    }

    type Mutation {
        _: String
    }
`

export const typeDefs = [
    baseTypeDefs,
    userTypeDefs,
    recipeTypeDefs,
    categoryTypeDefs
]