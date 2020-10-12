import { BaseContent } from './BaseContent';
import { Category } from "./Category";
import { User } from "./User";
export declare class Recipe extends BaseContent {
    description: string;
    ingredients: string[];
    category: Category;
    user: User;
}
