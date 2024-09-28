import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent, NgClass],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})
export class ReactiveFormComponent  {  
  
  taskForm = signal<FormGroup>(this.formBuilder.group({
    taskName: ['', Validators.required],
    limitDate: ['', Validators.required],
    associatedUsers: this.formBuilder.array([this.formBuilder.group({
      username: ['', Validators.required],
      age: ['', Validators.required],
      skills: this.formBuilder.array([this.formBuilder.control('')]),
    })]),
  }));
  
  // private formBuilder: FormBuilder = inject(FormBuilder)
  constructor(private formBuilder:FormBuilder ){} 

  onSubmit(){

  }
}
