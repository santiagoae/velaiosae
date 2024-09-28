import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren: () => import('./modules/modules.routes').then(r => r.route)
    },
    {
        path:'**',
        redirectTo: '',
        pathMatch: 'full'
    }
    
];
