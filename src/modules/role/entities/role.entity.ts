import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  roleName: string;

  // 备注信息
  @Column({ default: '' })
  explain: string;

  // 是否为激活状态
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToMany(() => User, (user) => user.role)
  user: User[];
}
