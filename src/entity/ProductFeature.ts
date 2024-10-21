import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CustomBaseEntity } from "./CustomBaseEntity";

@Entity()
export class ProductFeature extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @Column()
  feature: string;
}
