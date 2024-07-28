import { ProductsService } from './products/product.service';
import { CreateProductDto } from './products/create-product.dto';
import { OrdersService } from './orders/order.service';
import { ItemsService } from './items/item.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

import { Product, Prisma } from '@prisma/client';

export interface ProductsQueryParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.ProductWhereUniqueInput;
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
}

interface ProductsResponse {
  message: string;
  data: Product[];
}
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ProductsService: ProductsService,
    private readonly OrdersService: OrdersService,
    private readonly ItemsService: ItemsService,
  ) {}
  //CRUD --> CREATE - READ - UPDATE - DELETE
  // READY: CREATE PRODUCT
  @Post('products')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const createdProduct =
        await this.ProductsService.createProduct(createProductDto);
      return createdProduct;
    } catch (error) {
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // READY: FIND PRODUCTS
  @Get('products')
  async getProducts(
    @Query() queryParams: ProductsQueryParams,
  ): Promise<ProductsResponse> {
    try {
      //TODO: CORRIGIR O QUERY PARAMS
      console.log('queryParams:', queryParams);

      const { skip, take, cursor, where, orderBy } = queryParams;

      const products = await this.ProductsService.products({
        skip: Number(skip) || undefined,
        take: Number(take) || undefined,
        cursor,
        where,
        orderBy,
      });
      console.log('products:', products);
      return {
        message: 'Products retrieved successfully',
        data: products,
      };
    } catch (error) {
      console.error('Error:', error);
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // READY: FIND PRODUCTS BY ID
  @Get('products/:id')
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductsResponse> {
    try {
      const product = await this.ProductsService.product({ id });
      if (!product) {
        // Handle case where product might not be found
        return {
          message: 'Product not found',
          data: [], // Return empty array if product not found
        };
      }
      return {
        message: 'Product retrieved successfully',
        data: [product], // Wrap the retrieved product in an array
      };
    } catch (error) {
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // READY: FIND PRODUCTS BY CODE
  @Get('products/code/:code')
  async getProductByCode(
    @Param('code') code: string,
  ): Promise<ProductsResponse> {
    try {
      const product = await this.ProductsService.findProductByCode(code);
      if (!product) {
        // Handle case where product might not be found
        return {
          message: 'Product not found',
          data: [], // Return empty array if product not found
        };
      }
      return {
        message: 'Product retrieved successfully',
        data: [product], // Wrap the retrieved product in an array
      };
    } catch (error) {
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // READY: DELETE PRODUCT
  @Delete('products/:id')
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductsResponse> {
    try {
      const productDeleted = await this.ProductsService.deleteProduct({ id });
      if (!productDeleted) {
        // Handle case where product might not be found
        return {
          message: 'Product not found',
          data: [], // Return empty array if product not found
        };
      }
      return {
        message: 'Products deleted successfully',
        data: [productDeleted],
      };
    } catch (error) {
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('products/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ): Promise<ProductsResponse> {
    try {
      const updatedProduct = await this.ProductsService.updateProduct({
        where: { id },
        data: updateProductDto,
      });
      if (!updatedProduct) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Product retrieved successfully',
        data: [updatedProduct], // Wrap the retrieved product in an array
      };
    } catch (error) {
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
