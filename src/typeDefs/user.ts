import { gql } from 'apollo-server-express';

export const userTypeDefs = gql `
    extend type Query {
        user: User
    }

    type User {
        id: ID!
        name: NonEmptyString!
        email: EmailAddress!
        password: Password!
    }

    type UserCreated {
        id: ID
        name: String
    }

    input signUpInput {
        name: NonEmptyString!
        email: EmailAddress!
        password: Password!
    }

    type Token {
        token: String!
    }

    input loginInput {
        email: EmailAddress!
        password: Password!
    }

    extend type Mutation {
        signUp(input: signUpInput!): UserCreated
        login(input: loginInput!): Token
    }
`