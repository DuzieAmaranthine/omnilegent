import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { JwtBody } from "server/decorators/jwt_body.decorator";
import { Roles } from "server/decorators/roles.decorator";
import { JwtBodyDto } from "server/dto/jwt_body.dto";
import { RoleKey } from "server/entities/role.entity";
import { BookClubService } from "server/providers/services/book_club.service";
import { PostService } from "../../providers/services/post.service";

class PostBody {
  contents : string;
}
@Controller()
export class PostController {
  constructor(
    private postService : PostService,
    private bookClubService : BookClubService,
  ) {}

  @Get('/posts')
  @Roles(RoleKey.ADMIN)
  public async index() {
    const posts = await this.postService.findAllPosts();
    return { posts };
  }

  @Get('/posts/:clubId')
  public async list(@Param('clubId') clubId : string) {
    const posts = await this.postService.findAllForClub(parseInt(clubId, 10));
    return { posts };
  }

  @Get('/post/postId')
  public async show(@Param('postId') postId : string) {
    const post = await this.postService.findPostById(parseInt(postId, 10));
    return { post };
  }

  @Put('/post/:postId')
  public async edit(@Param('postId') postId : string, @JwtBody() jwtBody : JwtBodyDto, @Body() body : PostBody) {
    const post = await this.postService.findPostById(parseInt(postId, 10));

    if (jwtBody.userId !== post.userId) {
      return {'error' : 'You do not have permission to edit this post'};
    }

    post.contents = body.contents;
    post.postDate = new Date().getTime();

    const editedPost = await this.postService.updatePost(post, post.id);

    return { editedPost };
  }

  @Put('/like_post/postId')
  public async like(@Param('postId') postId : string, @JwtBody() jwtBody : JwtBodyDto) {
    const post = await this.postService.findPostById(parseInt(postId, 10));
    const index = post.likes.indexOf(jwtBody.userId);

    if (index !== -1) {
      post.likes.splice(index, 1);
    }

    else {
      post.likes.push(jwtBody.userId);
    }

    const editedPost = await this.postService.updatePost(post, post.id);

    return { editedPost };
  }

  @Delete('/post/postId')
  public async remove(@Param('postId') postId : string, @JwtBody() jwtBody : JwtBodyDto) {
    const post = await this.postService.findPostById(parseInt(postId, 10));
    const club = await this.bookClubService.findBookClubById(post.bookClubId);

    if (post.userId !== jwtBody.userId || post.userId !== club.ownerId) {
      return {'error': 'You do not have permission to delete this post'}
    }

    post.isDeleted = true;

    const editedPost = await this.postService.updatePost(post, post.id);

    return { editedPost };
  }
}