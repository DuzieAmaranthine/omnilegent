import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookClub } from "./book_club.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id : number;

  @Column({unique : false, nullable : false})
  bookClubId : number;

  @Column({unique : false, nullable : false})
  userId : number;

  @Column({unique : false, nullable : true})
  originalPostId : number;

  @Column({unique : false, nullable : false})
  userName : string;

  @Column({unique : false, nullable : false})
  contents : string;

  @Column({unique : false, nullable : false})
  postDate : number;

  @Column("int", {array : true, unique : false, nullable : false})
  likes : number[];

  @Column({unique : false, nullable : false})
  isDeleted : boolean;

  @ManyToOne(() => BookClub, (bookClub) => bookClub.posts)
  bookClub : BookClub

  @ManyToOne(() => Post, (post) => post.originalPost)
  originalPost : Post
}