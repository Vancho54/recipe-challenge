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

export interface IFilterInput {
    cursor: string;
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