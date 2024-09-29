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
      skills: this.formBuilder.array([new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$|^\S$/)])]),
    })]),
  }));
  
  // private formBuilder: FormBuilder = inject(FormBuilder)
  constructor(private formBuilder:FormBuilder ){} 

  getAssociatedUsersControl(){
     return this.taskForm().get('associatedUsers') as FormArray;
  }

  getSkillsOfAssociatedUser(associatedId:number){
    return this.getAssociatedUsersControl().at(associatedId).get('skills') as FormArray;
  }  

  onAddUser(){
    this.getAssociatedUsersControl().push(new FormGroup({
      username: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      skills: this.formBuilder.array([new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$|^\S$/)])]),
    }))
  }

  onDeleteUser(associatedId:number){
    this.getAssociatedUsersControl().removeAt(associatedId);
  }

  onAddSkill(associatedId:number){
    this.getSkillsOfAssociatedUser(associatedId).push(new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$|^\S$/)])); 
  }

  onDeleteSkill(associatedId:number, skillId:number){
    this.getSkillsOfAssociatedUser(associatedId).removeAt(skillId);
  }

  onSubmit(){
    this.validateFormBeforeSaveTask();
    // this.taskForm().reset();
  }

  validateFormBeforeSaveTask(){
    if(!this.taskForm().valid) return false;
    const associatedUsers = this.getAssociatedUsersControl().controls;
    console.log('form', this.taskForm().value);
    

    associatedUsers.forEach( (associatedUser, i) => {
      console.log('associatedUser' + i, associatedUser.get('username')?.value);      
    })

    return true;
  }
}
