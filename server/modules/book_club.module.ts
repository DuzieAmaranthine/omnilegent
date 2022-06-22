import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookClubController } from 'server/controllers/api/book_club.controller';
import { PostController } from 'server/controllers/api/post.controller';
import { BookClub } from 'server/entities/book_club.entity';
import { Post } from 'server/entities/post.entity';
import { UserBookClub } from 'server/entities/user_book_club.entity';
import { PostsGateway } from 'server/providers/gateways/post.gateway';
import { BookClubService } from 'server/providers/services/book_club.service';
import { JwtService } from 'server/providers/services/jwt.service';
import { PostService } from 'server/providers/services/post.service';
import { UsersService } from 'server/providers/services/users.service';
import { GuardUtil } from 'server/providers/util/guard.util';
import { UsersModule } from './users.module';

@Module({
  imports : [TypeOrmModule.forFeature([BookClub, UserBookClub, Post]), UsersModule],
  controllers : [BookClubController, PostController],
  providers : [PostsGateway, BookClubService, PostService, UsersService, JwtService, GuardUtil],
  exports : [],
})
export class BookClubModule {}