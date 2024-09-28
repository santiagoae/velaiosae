import { Component } from '@angular/core';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [ReactiveFormComponent],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

}
