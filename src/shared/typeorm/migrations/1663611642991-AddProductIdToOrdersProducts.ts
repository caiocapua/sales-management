import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class AddProductIdToOrdersProducts1663611642991
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'tb_orders_products',
            new TableColumn({
                name: 'product_id',
                type: 'uuid',
                isNullable: false,
            }),
        );

        await queryRunner.createForeignKey(
            'tb_orders_products',
            new TableForeignKey({
                name: 'OrdersProductsProduct',
                columnNames: ['product_id'],
                referencedTableName: 'tb_products',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'tb_orders_products',
            'OrdersProductsProduct',
        );
        await queryRunner.dropColumn('tb_orders_products', 'product_id');
    }
}
