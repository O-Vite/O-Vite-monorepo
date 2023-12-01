// import { robustoCrud } from './../../services/database/database.service';
import { Controller } from '@nestjs/common';
// import { TOmitBaseEntity } from 'packages/robusto-crud/base-entity';

// import { UserDb } from 'src/services/database/entities/user.entity';
// import typia from 'typia';
// import { TOmit } from 'utils/types';
// import { Except } from 'type-fest';

// type UserDto = TOmitBaseEntity<UserDb, 'password'>;
// type UserCreateDto = TOmitBaseEntity<UserDb>;
// type UserUpdateDto = Partial<UserCreateDto>;
@Controller('users')
export class UsersController {
  // private readonly crudator = robustoCrud({
  //   entityDB: UserDb,
  //   selectKeys: typia.misc.literals<keyof UserDto>(),
  //   selectDto: {} as UserDto,
  //   insertDto: {} as UserCreateDto,
  //   updateDto: {} as UserUpdateDto,
  //   wherePrefilter: [],
  // });
}
