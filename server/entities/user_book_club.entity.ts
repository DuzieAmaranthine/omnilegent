import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { BookClub } from './book_club.entity';

@Entity()
export class UserBookClub {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  userId : number;

  @Column()
  bookClubId : number;

  @Column({nullable : false})
  isBanned : boolean;

  @ManyToOne(() => User, (user) => user.userBookClubs)
  user : User;

  @ManyToOne(() => BookClub, (bookClub) => bookClub.userBookClubs)
  bookClub : BookClub;
}