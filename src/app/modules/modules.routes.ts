import { Routes } from "@angular/router";

export const route:Routes = [
    {
        path:'',
        loadComponent: () => import('./create-task/create-task.component').then(c => c.CreateTaskComponent),
        title: 'Modulo para la creacion de tareas'
    }
]