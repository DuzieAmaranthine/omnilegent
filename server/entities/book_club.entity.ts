import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserBookClub } from './user_book_club.entity';
import { Post } from './post.entity';

@Entity()
export class BookClub {
  @PrimaryGeneratedColumn()
  id : number;

  @Column({unique : false, nullable : true})
  ownerId : number;

  @Column({unique : true, nullable : false})
  key : string;

  @Column({unique : false, nullable : true})
  title : string;

  @Column({unique : false, nullable : true})
  description : string;

  @Column({nullable : false})
  isPublic : boolean;

  @OneToMany(() => UserBookClub, (userBookClub) => userBookClub.bookClub, {cascade : true})
  userBookClubs : UserBookClub[];

  @OneToMany(() => Post, (post) => post.bookClub, { cascade : true })
  posts : Post[];
}