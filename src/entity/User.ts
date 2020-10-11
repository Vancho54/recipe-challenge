import { Entity, Column, OneToMany } from "typeorm";
import { BaseContent } from './BaseContent';
import { Recipe } from './Recipe';

@Entity()
export class User extends BaseContent {

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Recipe, recipe => recipe.user)
    recipe: Recipe[];
}



