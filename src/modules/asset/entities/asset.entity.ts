import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Asset {
  // 自增id
  @PrimaryGeneratedColumn()
  id: number;

  // 账号(唯一)
  @Column({ unique: true })
  account: string;

  // 密码
  @Column({ type: 'varchar', length: 200 })
  password: string;

  // 姓名
  @Column()
  name: string;

  // 年龄
  @Column({ type: 'int' })
  age: number;

  // 手机号码
  @Column()
  phoneNumber: string;

  // 邮箱
  @Column()
  email: string;

  // 是否为激活状态
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
