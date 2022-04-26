import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from './message.entity'
import { UserChatRoom } from "./user_chatroom.entity";

@Entity()
export class ChatRoom {
	@PrimaryGeneratedColumn()
	id : number;

	@Column({unique : true, nullable : false })
	key : string;

	@Column({unique : false, nullable : false})
	name : string;

	@Column({unique : false, nullable : false})
	ownerName : string;

	@Column({unique : false, nullable : true})
	description : string;

	@Column({unique : false, nullable : false})
	ownerId : number;

	@OneToMany(() => UserChatRoom, (userChatRoom) => userChatRoom.chatRoom, { cascade : true})
	userChatRooms : UserChatRoom[];

	@OneToMany(() => Message, (message) => message.chatRoom, { cascade : true})
	messages : Message[];
}