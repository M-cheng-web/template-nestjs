import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Asset {
  // 自增id
  @PrimaryGeneratedColumn()
  id: number;

  // 资产名
  @Column()
  assetName: string;

  // 资产类型
  @Column()
  type: string;

  // 资产绑定人
  @OneToOne(() => User, (user) => user.asset)
  @JoinTable()
  user: User;

  // 当前绑定人 - 开始时间
  @Column({
    name: 'user_use_time',
    type: 'datetime',
    default: null,
  })
  userUseTime: string;

  // 当前绑定人 - 结束时间
  @Column({
    name: 'user_out_time',
    type: 'datetime',
    default: null,
  })
  userOutTime: string;

  // 资产绑定历史
  @Column({
    name: 'user_use_list',
    default: null,
  })
  userUseList: string;

  // 资产说明
  @Column({ type: 'varchar', length: 255, default: '' })
  description: string;

  // 是否为激活状态
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
