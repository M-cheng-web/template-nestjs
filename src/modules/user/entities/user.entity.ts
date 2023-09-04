import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  ManyToMany,
  OneToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Asset } from '../../asset/entities/asset.entity';

@Entity()
export class User {
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

  // 自动生成列
  @Generated('uuid')
  uuid: string;

  @ManyToMany(() => Role, (role) => role.user)
  @JoinTable()
  role: Role[];

  @OneToOne(() => Asset, (asset) => asset.user)
  @JoinColumn()
  asset: Asset;

  // 用户类型(辅助，并不是真实场景应用)
  @Column({
    // 枚举列
    type: 'enum',
    enum: [1, 2, 3, 4],
    default: 1,
  })
  userType: number;

  // 所有的列选项
  // @Column({
  //   type: 'varchar',
  //   name: 'ipaaa', // 数据库表中的列名
  //   nullable: true, // 在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false
  //   comment: '注释',
  //   select: true, // 定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true
  //   default: 'xxxx', // 加数据库级列的DEFAULT值
  //   primary: false, // 将列标记为主要列。 使用方式和@ PrimaryColumn相同
  //   update: true, // 指示"save"操作是否更新列值。如果为false，则只能在第一次插入对象时编写该值。 默认值为"true"
  //   collation: '', // 定义列排序规则
  // })
  // ip: string;
}
