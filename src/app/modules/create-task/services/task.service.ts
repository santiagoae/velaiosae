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

  saveTask(task:ITask): void{
    localStorage.setItem('tasks', JSON.stringify([...this.getTasks(), task]));
  }
}
