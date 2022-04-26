import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class AddUserChatRoom1650938547794 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.createTable(
			new Table({
				name : 'user_chatRoom',
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
						name : 'roomId',
						type : 'int',
						isNullable : false,
					},
				],
			}),
		);

		await queryRunner.createForeignKey(
			'user_chatRoom',
			new TableForeignKey({
				columnNames : ['userId'],
				referencedColumnNames : ['id'],
				referencedTableName : 'user',
				onDelete : 'CASCADE',
			}),
		);

		await queryRunner.createForeignKey(
			'user_chatRoom',
			new TableForeignKey({
				columnNames : ['roomId'],
				referencedColumnNames : ['id'],
				referencedTableName : 'chat_room',
				onDelete : 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user_chatRoom');
	}

}
