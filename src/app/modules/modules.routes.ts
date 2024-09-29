import { Routes } from "@angular/router";

export const route:Routes = [
    {
        path:'',
        redirectTo:'dashboard-tasks',
        pathMatch:'full'
    },
    {
        path:'create-task',
        loadComponent: () => import('./create-task/create-task.component').then(c => c.CreateTaskComponent),
        title: 'Modulo para la creacion de tareas'
    },
    {
        path:'dashboard-tasks',
        loadComponent: () => import('./dashboard-tasks/dashboard-tasks.component').then(c => c.DashboardTasksComponent),
        title: 'Modulo para mostrar las tareas'
    },
    {
        path:'update-task',
        loadComponent: () => import('./update-task/update-task.component').then(c => c.UpdateTaskComponent),
        title: 'Modulo para la actualización de tareas'
    }
]