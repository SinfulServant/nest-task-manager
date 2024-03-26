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

  async getAllTasks(userId) {
    return this.prisma.task.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async createTask(dto: CreateTaskDto, user: any) {
    return this.prisma.task.create({
      data: { isDone: false, ...dto, authorId: user.id },
    });
  }

  async toggleTask(id: number) {
    const task = await this.getById(id);
    return this.prisma.task.update({
      where: { id: task.id },
      data: { isDone: !task.isDone },
    });
  }
}
