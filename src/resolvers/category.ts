import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';
import { Recipe } from '../entity/Recipe';

import { IResolvers } from 'apollo-server';
import { IFilterInput, IUpdateCategory, IUser } from '../interfaces/interfaces';


export const categoryResolver: IResolvers = {
    Query: {
        category: async(_: any, { id }: { id: Number }, user: IUser): Promise<Object> => {
            try {
                if (!user.email) {
                    throw new Error ('Access denied, please login to continue')
                }
                const result = await getRepository(Category)
                    .findOne({where: {id: id}});
                if (!result) {
                    throw new Error('Category not found');
                }
                return result;
            } catch (error) {
                console.log(error);
                throw error;
            };
        },
        categories: async (_: any, args: IFilterInput, user: IUser): Promise<Object> => {
            const { cursor, limit = 5, input } = args
            try {
                let result
                let query
                if (!user.email) {
                    throw new Error ('Access denied, please login to continue')
                }
                if (input.filterby === "all") {
                    query = getRepository(Category)
                        .createQueryBuilder("category")
                        .orderBy('category.id', 'ASC')
                } else {
                    query = getRepository(Category)
                        .createQueryBuilder("category")
                        .orderBy('category.id', 'ASC')
                        .where(`LOWER(category.${input.filterby}) like LOWER(:text)`,
                        {text: `%${input.searchText}%`})
                }
                if (cursor) {
                    result = await query
                        .andWhere(`category.id > ${cursor}`)
                        .limit(limit + 1)
                        .getMany()
                } else {
                    result = await query
                        .limit(limit - 1)
                        .getMany()
                }
                const hasNextPage = result.length > limit;
                result = hasNextPage ? result.slice(0, -1) : result;
                return {
                    categoryFeed: result,
                    pageInfo: {
                        nextPageCursor: hasNextPage ? result[result.length -1].id : null,
                        hasNextPage
                    }
                };
            } catch (error) {
                console.log(error);
                throw error;
            };
        }
    },

    Category: {
        recipes: async (parent: Recipe): Promise<Object> => {
            const result = await getRepository(Recipe).find({relations: ['category'], where: {category: parent.id}});
            return result;
        }
    },

    Mutation: {
        createCategory: async(_: any, { input }: {input: {name: string}}, user: IUser): Promise<Object> => {
            try {
                if (!user.email) {
                    throw new Error ('Access denied, please login to continue');
                }
                const newCategory = await getRepository(Category)
                    .create({... input});
                return await getRepository(Category)
                    .save(newCategory);
            } catch(error) {
                console.log(error);
                throw error;
            };
        },
        deleteCategory: async (_: any, { id }: { id: number }, user: IUser): Promise<Boolean> => {
            try {
                if (!user.email) {
                    throw new Error ('Access denied, please login to continue');
                }
                const exist = await getRepository(Category)
                    .findOne(id)
                if (!exist) {
                    throw new Error ('Not found any category to delete');
                }
                await getRepository(Category)
                    .delete(id);
                return true;
            } catch(error) {
                console.log(error);
                throw error;
            };
        },
        updateCategory: async(_: any, args: IUpdateCategory, user: IUser): Promise<Object> => {
            const { input, id } = args
            try {
                if (!user.email) {
                    throw new Error ('Access denied, please login to continue');
                }
                const exist = await getRepository(Category)
                    .findOne({where: {id: id}});
                if (!exist) {
                    throw new Error ('Not found any category to update')
                }
                await getRepository(Category).update(id, {... input});
                return await getRepository(Category).findOneOrFail(id);
            } catch(error) {
                console.log(error);
                throw error;
            };
        },
    }
}