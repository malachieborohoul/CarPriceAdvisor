import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
}