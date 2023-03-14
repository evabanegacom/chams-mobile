import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../../Todo';

@Controller('todo')
export class TodoController {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  @Get()
  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<TodoEntity> {
    return await this.todoRepository.findOne(id);
  }

  @Post()
  async create(@Body() todo: TodoEntity): Promise<TodoEntity> {
    return await this.todoRepository.save(todo);
  }

  @Put(':id')
async update(@Param('id') id: any, @Body() todo: TodoEntity): Promise<TodoEntity> {
  const existingTodo = await this.todoRepository.findOne({
    where: { id: id },
  });
  if (!existingTodo) {
    console.log(`Todo with id ${id} not found`)
    throw new NotFoundException(`Todo with id ${id} not found`);
  }
  const updatedTodo = Object.assign(existingTodo, todo);
  await this.todoRepository.save(updatedTodo);
  const todos:any = await this.todoRepository.find(); // retrieve all todos from the database
  return todos;
}


  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.todoRepository.delete(id);
    const todos:any = await this.todoRepository.find(); // retrieve all todos from the database
    return todos;
  }
}
