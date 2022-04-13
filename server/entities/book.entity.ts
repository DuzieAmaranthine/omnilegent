import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity
export class Book {
	@PrimaryColumn()
	id : string;

	@Column({unique : false, nullable : true})
	title : string;

	@Column({unique : false, nullable : true})
	author : string;

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

	@ManyToOne(() => User, (user) => user.books)
	user : User;

}