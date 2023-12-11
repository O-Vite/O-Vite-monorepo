import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { TId } from 'packages/robusto-crud/base-entity';
import { Orm } from 'src/services/database/database.service';
import { UserEntity } from 'src/services/database/entities/user.entity';
import { RobustoHelper } from 'packages/robusto-crud/helpers';
import typia, { assertEquals, createAssertEquals } from 'typia';

export type TSignUpResponse = {
  sub: TId;
  access_token: string;
};

export type LoginDto = Pick<UserEntity, 'email' | 'password'>;
export type SelectLoginDto = Pick<
  UserEntity,
  'id' | 'email' | 'password' | 'role'
>;
export type InsertRegisterDto = Pick<UserEntity, 'email' | 'password' | 'role'>;

@Injectable()
export class AuthService {
  private orm = Orm;
  constructor(private jwtService: JwtService) {}

  async signIn(user: LoginDto): Promise<TSignUpResponse> {
    assertEquals<LoginDto>(user);

    const userLogin = await this.validateCredentialsUser({
      email: user.email,
      password: user.password,
    });

    if (userLogin) {
      const payload = {
        id: userLogin.id,
        email: userLogin.email,
        role: userLogin.role,
      };
      return {
        sub: userLogin.id,
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException(
        'Les informations de connexion sont incorrectes',
      );
    }
  }

  async register(user: InsertRegisterDto): Promise<TSignUpResponse> {
    assertEquals<InsertRegisterDto>(user);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await RobustoHelper.insert(
      Orm,
      {
        entityDB: UserEntity,
        assertInsertDto: createAssertEquals<InsertRegisterDto>(),
        selectKeys: [...typia.misc.literals<keyof SelectLoginDto>()],
        assertSelectDto: createAssertEquals<SelectLoginDto>(),
      },
      {
        ...user,
        password: hashedPassword,
      },
    );

    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    return {
      sub: newUser.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateCredentialsUser(data: LoginDto) {
    const resUser = await RobustoHelper.fetchAll(Orm, {
      entityDB: UserEntity,
      filter: [
        {
          key: 'email',
          operator: 'Equal',
          value: data.email,
        },
      ],
      assertSelectDtoArray: createAssertEquals<SelectLoginDto[]>(),
      selectKeys: [...typia.misc.literals<keyof SelectLoginDto>()],
    });

    const user = resUser?.[0] ?? null;

    if (user === null) {
      throw new UnauthorizedException('Incorrect login information');
    } else {
      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (passwordMatch) {
        return user;
      } else {
        throw new UnauthorizedException('Incorrect login information');
      }
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return null;
    }
  }
}
