import { gql } from 'apollo-server-express';

export const categoryTypeDefs = gql `
    extend type Query {
        category(id: ID!): Category
        categories(cursor: String, limit: Int, input: filterCategoryInput): CategoryFeed
    }

    type CategoryFeed {
        categoryFeed: [Category!]
        pageInfo: PageInfo
    }

    type Category {
        id: ID!
        name: String!
        recipes: [Recipe!]
    }

    input createCategoryInput {
        name: String!
    }

    input updateCategoryInput {
        name: String!
    }

    input filterCategoryInput {
        filterby: CategoryFilterBy!
        searchText: String
    }

    enum CategoryFilterBy {
        all
        name
    }

    extend type Mutation {
        createCategory(input: createCategoryInput!): Category
        deleteCategory(id: ID!): Boolean
        updateCategory(id:ID!, input: updateCategoryInput): Category
    }
`