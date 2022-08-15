import { Module } from "@nestjs/common";
import { PostService } from "./application/post.service";
import { PostController } from "./presentation/post.controller";

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
