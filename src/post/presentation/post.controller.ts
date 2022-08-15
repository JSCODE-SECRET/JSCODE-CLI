import { Controller } from "@nestjs/common";
import { PostService } from "../application/post.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('posts - 팔로워 관련')
@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService
  ) {}

}
