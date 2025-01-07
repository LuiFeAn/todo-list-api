import { CreateDateColumn, PrimaryColumn } from 'typeorm';

export class BaseTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
