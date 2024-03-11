import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/task-create.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) throw new NotFoundException('There isn`t task with such id!');

    return task;
  }

  async getAllTasks() {
    return this.prisma.task.findMany();
  }

  async createTask(dto: CreateTaskDto) {
    return this.prisma.task.create({ data: { isDone: false, ...dto } });
  }

  async toggleTask(id: number) {
    const task = await this.getById(id);
    return this.prisma.task.update({
      where: { id: task.id },
      data: { isDone: !task.isDone },
    });
  }
}
