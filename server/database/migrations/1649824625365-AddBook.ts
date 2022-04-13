import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddBook1649824625365 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name : 'book',
				columns : [
					{
						name : 'id',
						type : 'int',
						isPrimary : true,
						isGenerated : true,
					},
					{
						name : 'bookId',
						type : 'text',
						isNullable : true,
					},
					{
						name : 'title',
						type : 'text',
						isNullable : true,
					},
					{
						name : 'author',
						type : 'text',
						isNullable : true,
					},
					{
						name : 'description',
						type : 'text',
						isNullable : true,
					},
					{
						name : 'pages',
						type : 'int',
						isNullable : true,
					},
					{
						name : 'pubDate',
						type : 'text',
						isNullable : true,
					},
					{
						name : 'thumbnail',
						type : 'text',
						isNullable : true,
					},
					{
						name : 'hasRead',
						type : 'boolean',
						isNullable : false,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('book');
	}

}
