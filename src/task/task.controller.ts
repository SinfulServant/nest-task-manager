import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task-create.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): any {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number){
    return this.taskService.getById(+id)
  }

  @Post()
  addTask(@Body() newTask: CreateTaskDto) {
    console.log(newTask);
    this.taskService.createTask(newTask);
    return `new Task "${newTask.title}" was created`;
  }

  @Patch(':id')
  async toggleState(@Param('id') id: number){
    return this.taskService.toggleTask(+id)
  }
}
