import { BaseEntity } from './base.entity';
import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NotFoundException } from '@nestjs/common';

export class BaseService<T extends BaseEntity> {
  constructor(public readonly repository: Repository<T>) {}

  async fetchAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async fetchById(id: T['id']): Promise<T | null> {
    //@ts-ignore
    return this.repository.findOneBy({ id });
  }

  async insert<E extends DeepPartial<T>>(data: E): Promise<T> {
    return await this.repository.save(data);
  }

  async delete(id: T['id']): Promise<void> {
    await this.repository.delete(id);
  }

  async patch(id: T['id'], data: QueryDeepPartialEntity<T>): Promise<void> {
    const isExists = (await this.fetchById(id)) !== null;

    if (!isExists) {
      throw new NotFoundException("Entity doesn't exist");
    }

    this.repository.update(id, data);
  }
}
