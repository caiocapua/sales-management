import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class AddOrderIdToOrdersProducts1663611467076
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'tb_orders_products',
            new TableColumn({
                name: 'order_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'tb_orders_products',
            new TableForeignKey({
                name: 'OrdersProductsOrder',
                columnNames: ['order_id'],
                referencedTableName: 'tb_orders',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'tb_orders_products',
            'OrdersProductsOrder',
        );
        await queryRunner.dropColumn('tb_orders_products', 'order_id');
    }
}
