import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { PostRepository } from "../domain/post.repository";

@Injectable()
export class PostService {
  constructor(
    private dataSource: DataSource,
    private postRepository: PostRepository
  ) {}
}
