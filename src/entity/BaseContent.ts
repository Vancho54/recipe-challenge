import { PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class BaseContent {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}