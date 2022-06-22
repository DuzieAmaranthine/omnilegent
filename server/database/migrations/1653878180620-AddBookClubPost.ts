import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class AddBookClub1653872143917 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'book_club',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
					},
					{
						name: 'ownerId',
						type: 'int',
						isNullable: true,
					},
					{
						name: 'key',
						type: 'text',
						isNullable: false,
					},
					{
						name: 'title',
						type: 'text',
						isNullable: false,
					},
					{
						name: 'description',
						type: 'text',
						isNullable: true,
					},
					{
						name: 'isPublic',
						type: 'boolean',
						isNullable: false,
					},
				],
			}),
		);

		await queryRunner.createTable(
			new Table({
				name: 'user_book_club',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
					},
					{
						name: 'userId',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'bookClubId',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'isBanned',
						type: 'boolean',
						isNullable: false,
					},
				],
			}),
		);

		await queryRunner.createTable(
			new Table({
				name: 'post',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
					},
					{
						name: 'bookClubId',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'originalPostId',
						type: 'int',
						isNullable: true,
					},
					{
						name: 'userName',
						type: 'text',
						isNullable: false,
					},
					{
						name: 'userId',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'contents',
						type: 'text',
						isNullable: false,
					},
					{
						name: 'postDate',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'likes',
						type: 'int[]',
						isNullable: false,
					},
					{
						name: 'isDeleted',
						type: 'boolean',
						isNullable: false,
					},
				],
			}),
		);

		await queryRunner.createForeignKey(
			'user_book_club',
			new TableForeignKey({
				columnNames: ['userId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'user',
				onDelete: 'CASCADE',
			}),
		);

		await queryRunner.createForeignKey(
			'user_book_club',
			new TableForeignKey({
				columnNames: ['bookClubId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'book_club',
				onDelete: 'CASCADE',
			}),
		);

		await queryRunner.createForeignKey(
			'post',
			new TableForeignKey({
				columnNames: ['bookClubId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'book_club',
				onDelete: 'CASCADE',
			}),
		);

		await queryRunner.createForeignKey(
			'post',
			new TableForeignKey({
				columnNames: ['originalPostId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'post',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('post', 'post_postId_foreign');
		await queryRunner.dropForeignKey('post', 'post_bookClubId_foreign');
		await queryRunner.dropForeignKey('user_book_club', 'user_book_club_userId_foreign');
		await queryRunner.dropForeignKey('user_book_club', 'user_book_club_bookClubId_foreign');
		await queryRunner.dropTable('post');
		await queryRunner.dropTable('user_book_club');
		await queryRunner.dropTable('book_club');
	}

}
