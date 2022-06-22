import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ChatRoom } from './chat_room.entity';
import { RefreshToken } from './refresh_token.entity';
import { UserRole } from './user_role.entity';
import { Book } from './book.entity';
import { UserChatRoom } from './user_chatroom.entity';
import { UserBookClub } from './user_book_club.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  passwordHash: string;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  userRoles: UserRole[];

  @OneToMany(() => UserChatRoom, (userChatRoom) => userChatRoom.user, { cascade : true})
  userChatRooms : UserChatRoom[];

  @OneToMany(() => UserBookClub, (userBookClub) => userBookClub.user, { cascade : true})
  userBookClubs : UserBookClub[];
}
