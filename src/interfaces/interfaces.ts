export interface IUser {
    id: number;
    email: String;
    name: String;
    password: String,
}

export interface ILogSign {
    input: {
        email: string;
        password: string;
        name: string;
    }
}

export interface IGetMyRecipes {
    cursor: number;
    limit: number;
}

export interface IFilterInput {
    cursor: number;
    limit: number;
    input: {
        filterby: string;
        searchText?: string;
    }
}

export interface IInputRecipe {
        input: {
            name: string;
            description: string;
            ingredients: [string];
        }
        id: number;
}

export interface IInputCreateRecipe {
    input: {
        name: string;
        description: string;
        ingredients: [string];
    }
    categoryId: number;
}

export interface IUpdateCategory {
    input: {
        name: string
    }
    id: number;
}

export interface IPaginatedResult<T> {
    recipeFeed?: T;
    categoryFeed?: T;
    pageInfo: {
        nextPageCursor: number | null
        hasNextPage: boolean
    }
}