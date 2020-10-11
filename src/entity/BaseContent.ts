import { PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class BaseContent {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;
}