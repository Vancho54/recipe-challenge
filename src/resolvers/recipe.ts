import { IResolvers } from 'apollo-server-express';
import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';
import { Recipe } from '../entity/Recipe';
import { User } from '../entity/User'
import { IFilterInput, IInputCreateRecipe, IInputRecipe, IUser } from '../interfaces/interfaces';


export const recipeResolver: IResolvers = {
    Query: {
        getMyRecipes: async (_: any, __: any, user: IUser): Promise<Object> => {
            try {
                if (!user.email) {
                    throw new Error ('Access denied, please login to continue');
                }
                const result = await getRepository(Recipe)
                    .find({where: {user: user.id}, relations: ['user', 'category']});
                return result;
            } catch(error) {
                console.log(error);
                throw error;
            };
        },
        recipe: async(_: any, { id }: {id: number}, user: IUser): Promise<Object> => {
            try {
                if (!user.email) {
                    throw new Error ('Access denied, please login to continue');
                }
                const result = await getRepository(Recipe)
                    .findOne({where: {id: id}, relations: ['category', 'user']});
                if (!result) {
                    throw new Error('Recipe not found');
                }
                return result;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        recipes: async (_: any, args: IFilterInput, user: IUser): Promise<Object> => {
            const { cursor, limit = 5, input } = args
            try {
                let query;
                let result;
                if (!user.email) {
                    throw new Error ('Access denied, please login to continue');
                }
                if (input.filterby === "all") {
                    query = getRepository(Recipe)
                        .createQueryBuilder("recipe")
                        .leftJoinAndSelect("recipe.category", "category")
                        .leftJoinAndSelect("recipe.user", "user")
                        .orderBy('recipe.id', 'ASC')
                } else {
                    query = getRepository(Recipe)
                        .createQueryBuilder("recipe")
                        .leftJoinAndSelect("recipe.category", "category")
                        .leftJoinAndSelect("recipe.user", "user")
                        .orderBy('recipe.id', 'ASC')
                        .where(`LOWER(recipe.${input.filterby}) like LOWER(:text)`, 
                        {text: `%${input.searchText}%`})
                }
                if (cursor) {
                    result = await query
                        .andWhere(`recipe.id > ${cursor}`)
                        .limit(limit + 1)
                        .getMany()
                } else {
                    result = await query
                        .limit(limit + 1)
                        .getMany();
                }
                const hasNextPage = result.length > limit;
                result = hasNextPage ? result.slice(0, -1) : result;
                return {
                    recipeFeed: result,
                    pageInfo: {
                        nextPageCursor: hasNextPage ? result[result.length -1].id : null,
                        hasNextPage
                    }
                };
            } catch (error) {
                console.log(error);
                throw error;
            };
        },
    },

    Mutation: {
        createRecipe: async(_: any, args: IInputCreateRecipe, loggedUser: IUser): Promise<Object> => {
            const { input, categoryId } = args
            try {
                if (!loggedUser.email) {
                    throw new Error ('Access denied, please login to continue');
                }
                const category = await getRepository(Category)
                    .findOne(categoryId);
                if (!category) {
                    throw new Error ('Category not found');
                }
                const user = await getRepository(User)
                    .findOne(loggedUser.id);
                const newRecipe = await getRepository(Recipe)
                    .create({... input,
                        category,
                        user});
                return await getRepository(Recipe).save(newRecipe);
            } catch(error) {
                console.log(error);
                throw error;
            };
        },
        deleteRecipe: async (_: any, { id }: { id: number }, user: IUser): Promise<Boolean> => {
            try {
                if (!user.email) {
                    throw new Error ('Access denied, please login to continue');
                }
                const exist = await getRepository(Recipe)
                    .findOne({where: {id: id}})
                if (!exist) {
                    throw new Error ('Not found any recipe to delete')
                }
                await getRepository(Recipe).delete(id);
                return true;
            } catch (error) {
                console.log(error);
                throw error;
            };
        },
        updateRecipe: async(_: any, args: IInputRecipe, user: IUser): Promise<Object> => {
            const { input, id } = args
            try {
                if (!user.email) {
                    throw new Error ('Access denied, please login to continue');
                }
                const exist = await getRepository(Recipe)
                    .findOne({where: {id: id}})
                if (!exist) {
                    throw new Error ('Not found any recipe to update')
                }
                await getRepository(Recipe)
                    .update(id, {... input});
                return await getRepository(Recipe).findOneOrFail(id);
            } catch (error) {
                console.log(error);
                throw error;
            };
        },
    }
}