import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Book {
	@PrimaryGeneratedColumn()
	id : number;

	@Column({unique : false, nullable : true})
	bookId : string;

	@Column({unique : false, nullable : true})
	title : string;

	@Column({unique : false, nullable : true})
	author : string;

	@Column({unique : false, nullable : true})
	genre : string;

	@Column({unique : false, nullable : true})
	description : string;

	@Column({unique : false, nullable : true})
	pages : number;

	@Column({unique : false, nullable : true})
	pubDate : string;

	@Column({unique : false, nullable : true})
	thumbnail : string;

	@Column({unique : false, nullable : false})
	hasRead : boolean;

	@Column({unique : false, nullable : true})
	dateRead : string;

	@Column({unique : false, nullable : false})
	userId : number;

}