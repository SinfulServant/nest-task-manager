import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task-create.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Task manage')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  // @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  getAllTasks(): any {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get task by task id' })
  getTaskById(@Param('id') id: number) {
    return this.taskService.getById(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Post new task' })
  @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  addTask(@Body() newTask: CreateTaskDto) {
    console.log(newTask);
    this.taskService.createTask(newTask);
    return `new Task "${newTask.title}" was created`;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Change task status' })
  async toggleState(@Param('id') id: number) {
    return this.taskService.toggleTask(+id);
  }
}
