// import { AuthGuard } from './services/guard/auth/auth.guard';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './services/database/database.module';
import { ArticleModule } from './api/articles/articles.module';

// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './services/guard/role/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ArticleModule,
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
