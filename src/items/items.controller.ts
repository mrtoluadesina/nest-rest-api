import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-items.dto';
import { Item } from './interfaces/item.interface';
import { ItemsService } from './items.service';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOkResponse({ type: CreateItemDto, isArray: true })
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @ApiOkResponse({ type: CreateItemDto, description: 'The Item' })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id): Promise<Item> {
    const item = this.itemsService.findOne(id);

    if (!item) throw new NotFoundException();

    return item;
  }

  @ApiCreatedResponse({ type: CreateItemDto })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }
}
