import { Routes } from "@angular/router";

export const route:Routes = [
    {
        path:'',
        loadComponent: () => import('./crear-tarea/crear-tarea.component').then(c => c.CrearTareaComponent),
        title: 'Modulo para la creacion de tareas'
    }
]