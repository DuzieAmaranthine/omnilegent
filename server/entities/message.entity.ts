import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatRoom } from './chat_room.entity';

@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id : number;

	@Column({unique : false, nullable : false})
	userName : string;

	@Column({unique : false, nullable : false})
	contents : string;

	@Column({unique : false, nullable : false})
	chatRoomId : number;

	@ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
	chatRoom : ChatRoom;
}