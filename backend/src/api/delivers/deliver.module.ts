import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DelivererEntity } from '../../services/database/entities/deliverer.entity';
import { DelivererService } from './deliver.service';

@Module({
  imports: [TypeOrmModule.forFeature([DelivererEntity])],
  providers: [DelivererService],
  exports: [DelivererService],
})
export class DelivererModule {}
