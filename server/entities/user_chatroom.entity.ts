import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';
import { ChatRoom } from './chat_room.entity';

@Entity()
export class UserChatRoom {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  userId : number;

  @Column()
  roomId : number;

  @ManyToOne(() => User, (user) => user.userChatRooms)
  user : User;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.userChatRooms)
  chatRoom : ChatRoom;
}
