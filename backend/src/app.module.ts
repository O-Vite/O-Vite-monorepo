// import { AuthGuard } from './services/guard/auth/auth.guard';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './services/database/database.module';
// import { UsersModule } from './api/users/users.module';
// import { AuthModule } from './api/auth/auth.module';

// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './services/guard/role/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    // UsersModule,
    // AuthModule,
  ],
  controllers: [],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  //   },
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule {}
