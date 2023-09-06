import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { UserModule } from '../user/user.module';
import { Asset } from './entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset]), UserModule],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
