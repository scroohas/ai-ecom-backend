import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CustomBaseEntity } from "./CustomBaseEntity";

@Entity()
export class ProductIssue extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @Column()
  issue: string;
}
