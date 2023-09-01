import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  roleName: string;

  @Column({ default: '' })
  explain: string;

  @ManyToMany(() => User, (user) => user.role)
  user: User[];
}
