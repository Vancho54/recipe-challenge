import { userResolver } from './user'
import { recipeResolver } from './recipe'
import { categoryResolver } from './category'
import { scalars } from './scalar/scalar'


export const resolvers = [
    scalars,
    userResolver,
    recipeResolver,
    categoryResolver
]