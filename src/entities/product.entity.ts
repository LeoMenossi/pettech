import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IProduct } from "./models/product.interface";
import { ICategory } from "./models/category.interface";
import { Category } from "./category.entity";

@Entity({
    name: 'product', //Nome da tabela no banco de dados
})
export class Product implements IProduct{

    @PrimaryGeneratedColumn("uuid", {
        name: 'id', //Nome da coluna no banco de dados
    })
    id?: string

    @Column({
        name: 'name',
        type: 'varchar',
    })
    name: string

    @Column({
        name: 'description',
        type: 'text',
    })
    description: string

    @Column({
        name: 'image_url',
        type: 'varchar',
    })
    image_url: string

    @Column({
        name: 'price',
        type: 'double precision',
    })
    price: number

    @ManyToMany(() => Category, {
        cascade: true,
    })
    @JoinTable({
        name: 'product_category',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        }
    })
    categories?: ICategory[] | undefined;

    constructor(
        name: string,
        description: string,
        image_url: string,
        price: number
    ){
        this.name = name
        this.description = description
        this.image_url = image_url
        this.price = price
    }
}