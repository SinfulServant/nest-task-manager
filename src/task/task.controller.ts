import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task-create.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { IUser } from 'src/auth/jwt-strategy';

@ApiTags('Task manage')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  // @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  getAllTasks(@Req() req: { user?: IUser }): any {
    return this.taskService.getAllTasks(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  @ApiOperation({ summary: 'Get task by task id' })
  getTaskById(@Param('id') id: number) {
    return this.taskService.getById(+id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Post new task' })
  // @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  addTask(
    @Body() newTask: CreateTaskDto,
    @Req() req: Request & { user?: any },
  ) {
    const user = req.user as IUser;
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', user);
    this.taskService.createTask(newTask, req.user);
    return `new Task "${newTask.title}" was created`;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Change task status' })
  async toggleState(@Param('id') id: number) {
    return this.taskService.toggleTask(+id);
  }
}
