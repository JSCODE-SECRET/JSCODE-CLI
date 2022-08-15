import { PostRepository } from "../../common/decorators/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Post } from "./post.entity";

@CustomRepository(Post)
export class PostRepository extends Repository<Post> {
}
