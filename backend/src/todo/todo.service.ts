import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../../Todo';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async create(name: string, description: string): Promise<TodoEntity> {
    const todo = new TodoEntity();
    todo.name = name;
    todo.description = description;
    return await this.todoRepository.save(todo);
  }

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: any): Promise<TodoEntity> {
    return await this.todoRepository.findOne(id);
  }

  async update(id: any, name: string, description: string): Promise<void> {
    await this.todoRepository.update(id, { name, description });
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
