import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateLocations1599933472944
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'locations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'tenent_id',
            type: 'uuid',
          },
          {
            name: 'propertie_id',
            type: 'uuid',
          },
          {
            name: 'date_start',
            type: 'timestamp',
          },
          {
            name: 'date_end',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'locations',
      new TableForeignKey({
        name: 'LocationUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'locations',
      new TableForeignKey({
        name: 'LocationTenent',
        columnNames: ['tenent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tenents',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'locations',
      new TableForeignKey({
        name: 'LocationPropertie',
        columnNames: ['propertie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'properties',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('locations', 'LocationUser');
    await queryRunner.dropForeignKey('locations', 'LocationTenent');
    await queryRunner.dropForeignKey('locations', 'LocationPropertie');
    await queryRunner.dropTable('locations');
  }
}
