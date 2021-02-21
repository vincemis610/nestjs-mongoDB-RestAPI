import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { RSA_NO_PADDING } from 'constants';
import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO ) {
        const product = await this.productService.createProduct(createProductDTO);
        res.status(HttpStatus.OK).json({msg: 'New product storaged successfully', product});
    }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({ products });
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException(`Prouct with id ${productID} not exist!`)
        return res.status(HttpStatus.OK).json({product});
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const product = await this.productService.deleteProduct(productID);
        if (!product) throw new NotFoundException(`Prouct with id ${productID} not exist!`);
        return res.status(HttpStatus.OK).json({msg: 'Product deleted successfully', product});
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO : CreateProductDTO, @Query('productID') productID) {
        const product = await this.productService.updateProduct(productID, createProductDTO);
        if (!product) throw new NotFoundException(`Prouct with id ${productID} not exist!`);
        return res.status(HttpStatus.OK).json({msg: 'Product Updated Successfully', product})
    }

}
