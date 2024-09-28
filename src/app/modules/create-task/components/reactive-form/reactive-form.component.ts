import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
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
      skills: this.formBuilder.array([new FormControl('', [Validators.required])]),
    })]),
  }));
  
  // private formBuilder: FormBuilder = inject(FormBuilder)
  constructor(private formBuilder:FormBuilder ){} 

  getAssociatedUsersControl(){
     return this.taskForm().get('associatedUsers') as FormArray;
  }

  onSubmit(){

  }

  onAddUser(){
    this.getAssociatedUsersControl().push(new FormGroup({
      username: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      skills: this.formBuilder.array([new FormControl('', [Validators.required])]),
    }))
  }
}
