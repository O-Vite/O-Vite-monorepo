// deliverer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DelivererEntity } from '../../services/database/entities/deliverer.entity';
import { UserEntity } from '../../services/database/entities/user.entity';

@Injectable()
export class DelivererService {
  constructor(
    @InjectRepository(DelivererEntity)
    private delivererRepository: Repository<DelivererEntity>,
  ) {}

  async createForUser(userId: string, kbisNumber?: string) {
    console.log('Creating deliverer for user:', userId);

    const userReference: Partial<UserEntity> = { id: userId };
    const deliverer = this.delivererRepository.create({
      user: userReference,
      kbisNumber: kbisNumber ?? null,
    });

    const savedDeliverer = await this.delivererRepository.save(deliverer);
    console.log('Deliverer saved:', savedDeliverer);

    return savedDeliverer;
  }
}
