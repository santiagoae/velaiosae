import { Component } from '@angular/core';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [ReactiveFormComponent],
  templateUrl: './crear-tarea.component.html',
  styleUrl: './crear-tarea.component.scss'
})
export class CrearTareaComponent {

}
