import { Entity, OneToMany } from "typeorm";
import { BaseContent } from './BaseContent';
import { Recipe } from './Recipe';

@Entity()
export class Category extends BaseContent {

    @OneToMany(type => Recipe, recipe => recipe.category)
    recipes: Recipe[];
}