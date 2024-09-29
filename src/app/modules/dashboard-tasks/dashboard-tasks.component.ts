import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from './services/task.service';
import { ITask } from './interface/task.interface';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-tasks',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './dashboard-tasks.component.html',
  styleUrl: './dashboard-tasks.component.scss'
})
export class DashboardTasksComponent implements OnInit {

  allTasks = signal<Array<ITask>>([]);
  allTasksCopy = signal<Array<ITask>>([]);

  private router = inject(Router);
  private taskService = inject(TaskService);
  
  ngOnInit(): void {
    this.#getTasks();
  }

  onCreateTask(){
    this.router.navigate(['/create-task']);
  }

  onDeleteTask(taskId:number){
    this.taskService.deleteTask(taskId);
    this.#getTasks();
  }

  onEditTask(taskId:number){
    this.router.navigateByUrl(`/update-task?taskId=${taskId}`);
  }

  onSuccessTask(taskId:number){
    this.allTasks()[taskId].done = true;
    this.taskService.updateTask(taskId, this.allTasks()[taskId]);
  }

  onFilterByDoneTasks(done:boolean){
    if(this.allTasksCopy().length === 0) this.allTasksCopy.set(this.allTasks());
    
    const filteredTasks = this.allTasksCopy().filter(task => task.done === done);

    this.allTasks.set(filteredTasks);
  }

  onClearFilter(){
    this.allTasks.set(this.allTasksCopy());
    this.allTasksCopy.set([]);
  }

  #getTasks(){
    this.allTasks.set(this.taskService.getTasks());
  }
  
}
