import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 50,
    }),
    OrdersModule,
  ],
})
export class AppModule {}
