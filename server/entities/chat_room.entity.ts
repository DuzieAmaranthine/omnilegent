import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Message } from './message.entity'

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

	@ManyToOne(() => User, (user) => user.chatRooms)
	owner : User;

	@OneToMany(() => Message, (message) => message.chatRoom, { cascade : true})
	messages : Message[];
}