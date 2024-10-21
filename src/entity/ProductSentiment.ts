import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CustomBaseEntity } from "./CustomBaseEntity";

@Entity()
export class ProductSentiment extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @Column()
  productName: string;

  @Column()
  positive: number;

  @Column()
  neutral: number;

  @Column()
  negative: number;
}
