import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
}
