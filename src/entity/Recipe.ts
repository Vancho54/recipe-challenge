import { Entity, Column, ManyToOne } from "typeorm";
import { BaseContent } from './BaseContent'
import { Category } from "./Category";
import { User } from "./User";

@Entity()
export class Recipe extends BaseContent {
    
    @Column()
    description: string;

    @Column("simple-array", {default: ""})
    ingredients: string[];

    @ManyToOne(type => Category, category => category.recipes, {onDelete: 'CASCADE'})
    category: Category;

    @ManyToOne(type => User, user => user.recipe)
    user: User;
}
