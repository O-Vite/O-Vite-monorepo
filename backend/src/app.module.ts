import { DeliverersModule } from './api/deliverers/deliverers.module';
// import { AuthGuard } from './services/guard/auth/auth.guard';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './services/database/database.module';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { SupportsModule } from './api/supports/supports.module';
import { SellersModule } from './api/sellers/sellers.module';
import { ProductsModule } from './api/products/products.module';
import { OrdersModule } from './api/orders/orders.module';
import { OrderProductsModule } from './api/order_products/order_products.module';
import { MessagesModule } from './api/messages/messages.module';
import { ComplainsModule } from './api/complains/complains.module';
import { ClientsModule } from './api/clients/clients.module';
// import { UsersModule } from './api/users/users.module';
// import { AuthModule } from './api/auth/auth.module';

// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './services/guard/role/role.guard';
import { ChatsModule } from './api/chats/chats.module';
import { BrandsModule } from './api/brands/brands.module';
import { LocationGateway } from './realtime/location/location.gateway';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    DatabaseModule,
    UsersModule,
    SupportsModule,
    AuthModule,
    SellersModule,
    ProductsModule,
    OrdersModule,
    OrderProductsModule,
    MessagesModule,
    DeliverersModule,
    ComplainsModule,
    ClientsModule,
    ChatsModule,
    BrandsModule,
  ],
  controllers: [],
  providers: [LocationGateway],
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
