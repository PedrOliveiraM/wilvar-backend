import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsService } from './products/product.service';
import { OrdersService } from './orders/order.service';
import { ItemsService } from './items/item.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    ProductsService,
    OrdersService,
    ItemsService,
    PrismaService,
  ],
})
export class AppModule {}
