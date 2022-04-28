import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class AddChatroomMessage1649824605445 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name : 'chat_room',
					columns : [
						{
							name : 'id',
							type : 'int',
							isPrimary : true,
							isGenerated : true,
						},
						{
							name : 'key',
							type : 'text',
							isNullable : false,
						},
						{
							name : 'title',
							type : 'text',
							isNullable : false,
						},
						{
							name : 'ownerName',
							type : 'text',
							isNullable : false,
						},
						{
							name : 'description',
							type : 'text',
							isNullable : true
						},
						{
							name : 'ownerId',
							type : 'int',
							isNullable : false,
						},
					],
				}),
		);

		await queryRunner.createTable(
			new Table({
				name : 'user_chat_room',
				columns : [
					{
						name : 'id',
						type : 'int',
						isPrimary : true,
						isGenerated : true,
					},
					{
						name : 'userId',
						type : 'int',
						isNullable : false,
					},
					{
						name : 'chatRoomId',
						type : 'int',
						isNullable : false,
					},
				],
			}),
		);

		await queryRunner.createTable(
			new Table({
				name : 'message',
				columns : [
					{
						name : 'id',
						type : 'int',
						isPrimary : true,
						isGenerated :true,
					},
					{
						name : 'userName',
						type : 'text',
						isNullable : false,
					},
					{
						name : 'contexts',
						type : 'text',
						isNullable : false,
					},
					{
						name : 'chatRoomId',
						type : 'int',
						isNullable : false,
					},
				],
			}),
		);

		await queryRunner.createForeignKey(
			'message',
			new TableForeignKey({
				columnNames : ['chatRoomId'],
				referencedColumnNames : ['id'],
				referencedTableName : 'chat_room',
				onDelete : 'CASCADE',
			}),
		);

		await queryRunner.createForeignKey(
			'user_chat_room',
			new TableForeignKey({
				columnNames : ['userId'],
				referencedColumnNames : ['id'],
				referencedTableName : 'user',
				onDelete : 'CASCADE',
			}),
		);

		await queryRunner.createForeignKey(
			'user_chat_room',
			new TableForeignKey({
				columnNames : ['chatRoomId'],
				referencedColumnNames : ['id'],
				referencedTableName : 'chat_room',
				onDelete : 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('message');
		await queryRunner.dropTable('chat_room');
		await queryRunner.dropTable('user_chat_room');
	}

}
