import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddChatroomMessage1649824605445 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name : 'chatroom',
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
							name : 'name',
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
						name : 'user',
						type : 'text',
						isNullable : false,
					},
					{
						name : 'contexts',
						type : 'text',
						isNullable : false,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('message');
		await queryRunner.dropTable('chatroom');
	}

}
