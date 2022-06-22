import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../../entities/post.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository : Repository<Post>,
  ) {}

  findAllPosts() {
    return this.postRepository.find();
  }

  findAllForClub(clubId : number): Promise<Post[]> {
    return this.postRepository.find({
      where : { bookClubId : clubId, },
    });
  }

  findPostById(id : number): Promise<Post> {
    return this.postRepository.findOne(id);
  }

  async createPost(post : Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  async updatePost(post : Post, postId : number) {
    return this.postRepository.update(postId, post);
  }

  async deletePost(post : Post): Promise<void> {
    await this.postRepository.delete(post);
  }

}