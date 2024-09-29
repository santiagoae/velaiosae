import { Component, input } from '@angular/core';
import { ITask } from '../../interface/task.interface';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  selectedTask = input<ITask | undefined>(undefined); 
}
