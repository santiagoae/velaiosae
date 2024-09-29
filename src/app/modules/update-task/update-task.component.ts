import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [ReactiveFormComponent],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent implements OnInit {

  selectedTaskId = signal<number>(0);
  
  private actRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(({taskId}) => {
      this.selectedTaskId.set(taskId);
    })
  }

  backLink(){
    this.router.navigate(['/dashboard-tasks']);
  }

}
