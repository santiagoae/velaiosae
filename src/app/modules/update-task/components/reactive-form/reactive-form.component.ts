import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { NgClass } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interface/task.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent, NgClass],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})
export class ReactiveFormComponent implements OnInit {
  
  taskId = input<number>(0);
  selectedTask = signal<ITask | undefined>(undefined);
  validateWarningMessage = signal<string>('');
  successfulSaveMessage = signal<string>('');
  taskForm = signal<FormGroup>(this.formBuilder.group({
    taskName: ['', Validators.required],
    limitDate: ['', Validators.required],
    associatedUsers: this.formBuilder.array([this.formBuilder.group({
      username: ['', Validators.required],
      age: ['', Validators.required],
      skills: this.formBuilder.array([new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$|^\S$/)])]),
    })]),
    done: [false]
  }));

  private taskService = inject(TaskService);
  private router = inject(Router);  
  // private formBuilder: FormBuilder = inject(FormBuilder)

  constructor(private formBuilder:FormBuilder ){} 

  ngOnInit(): void {
    this.selectedTask.set(this.taskService.getTaskById(this.taskId()));
    this.#fillForm(); 
  }

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
    const isValid =this.validateFormBeforeSaveTask();
    if(isValid){
      this.taskService.updateTask(this.taskId(), this.taskForm().value);
      this.taskForm().reset();
      this.successfulSaveMessage.set('Task saved successfully');
      setTimeout(() => {
        this.successfulSaveMessage.set('');
        this.router.navigate(['/dashboard-tasks']);
      }, 3500);
    }
  }

  validateFormBeforeSaveTask(): boolean{
    this.validateWarningMessage.set('');
    if(!this.taskForm().valid) {
      this.validateWarningMessage.set('Task is not valid');
      return false;
    };

    const associatedUsers = this.getAssociatedUsersControl().controls;

    let lastAssociatedUser:string = ''
    for(const associatedUser of associatedUsers ){
      const controlName = associatedUser.get('username');
      const controlAge = associatedUser.get('age');
      if(String(controlName?.value).toLowerCase() === lastAssociatedUser) {
        this.validateWarningMessage.set('No repetir el nombre de usuario');
        controlName?.setErrors({ invalid: true });
        break;
      };

      if(controlAge?.value < 18) {
        this.validateWarningMessage.set('Debe tener la mayoria de edad');
        controlAge?.setErrors({ invalid: true });
        break;
      }

      lastAssociatedUser = String(controlName?.value).toLowerCase();
    }

    return this.taskForm().valid ? true : false;
  }
  

  #fillForm(){
    this.taskForm().get('taskName')?.setValue(this.selectedTask()?.taskName);
    this.taskForm().get('limitDate')?.setValue(this.selectedTask()?.limitDate);    
    this.taskForm().get('done')?.setValue(this.selectedTask()?.done);    
    this.selectedTask()?.associatedUsers.forEach((user, associatedIndex) => {
      this.getAssociatedUsersControl().at(associatedIndex).get('username')?.setValue(user.username);
      this.getAssociatedUsersControl().at(associatedIndex).get('age')?.setValue(user.age);
      user.skills.forEach((skill, index) => {
        this.getSkillsOfAssociatedUser(associatedIndex).at(index).setValue(skill);
      });
    });
  }
}
