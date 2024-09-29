import { Injectable } from '@angular/core';
import { ITask } from '../interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTasks():Array<ITask>{
    const tasks:Array<ITask> = JSON.parse(localStorage.getItem('tasks') ?? '[]');
    return tasks;
  }
  
  getTaskById(taskId:number):ITask{
    const tasks:Array<ITask> = JSON.parse(localStorage.getItem('tasks') ?? '[]');
    return tasks[taskId];
  }

  updateTask(taskId:number, task:ITask){
    const tasks = this.getTasks();
    tasks.splice(taskId, 1, task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
