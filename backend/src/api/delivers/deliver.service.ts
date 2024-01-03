// deliverer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DelivererEntity } from '../../services/database/entities/deliverer.entity';
import { UserEntity } from '../../services/database/entities/user.entity';
import { DeepPartial } from 'typeorm';
import { CreateDelivererDto } from './dto/deliver.dto';

@Injectable()
export class DelivererService {
  constructor(
    @InjectRepository(DelivererEntity)
    private delivererRepository: Repository<DelivererEntity>,
  ) {}

  // async createForUser(userId: string): Promise<DelivererEntity> {
  //   const deliverer = this.delivererRepository.create({ userId });
  //   return this.delivererRepository.save(deliverer);
}
