import { PartialType } from '@nestjs/mapped-types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { tags } from 'typia';

export class CreateUserDto {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique:x true,
  })
  public email: TEmail;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public password: TPassword;
}

@Entity()
export class UserDb extends CreateUserDto {
  @PrimaryGeneratedColumn('uuid')
  public id: TId;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserDto {
  id: TId;
  email: TEmail;

  constructor(user: UserDb) {
    this.id = user.id;
    this.email = user.email;
  }
}

export type TPassword = string & tags.Pattern<'^[a-zA-Z0-9]{8,30}$'>;

export type TEmail = string & tags.Format<'email'>;
export type TId = string & tags.Format<'uuid'>;

// export type Strict<T> = T & { readonly __tag: unique symbol };
// const toStrict = <T>(value: T) => value as Strict<T>;
