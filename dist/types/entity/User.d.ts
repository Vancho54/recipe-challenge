import { BaseContent } from './BaseContent';
import { Recipe } from './Recipe';
export declare class User extends BaseContent {
    email: string;
    password: string;
    recipe: Recipe[];
}
